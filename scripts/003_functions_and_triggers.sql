-- ============================================
-- AUTOMATIC PROFILE CREATION
-- ============================================

-- Function to create profile on user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', '')
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to create profile automatically
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================
-- INVENTORY STOCK UPDATE FUNCTION
-- ============================================

-- Function to update inventory stock after transaction
create or replace function public.update_inventory_stock()
returns trigger as $$
begin
  if new.transaction_type in ('purchase', 'return') then
    update public.inventory
    set quantity_in_stock = quantity_in_stock + new.quantity
    where id = new.inventory_id;
  elsif new.transaction_type in ('usage', 'disposal') then
    update public.inventory
    set quantity_in_stock = quantity_in_stock - new.quantity
    where id = new.inventory_id;
  elsif new.transaction_type = 'adjustment' then
    update public.inventory
    set quantity_in_stock = new.quantity
    where id = new.inventory_id;
  end if;
  
  return new;
end;
$$ language plpgsql security definer;

-- Trigger for inventory transactions
create trigger on_inventory_transaction
  after insert on public.inventory_transactions
  for each row execute function public.update_inventory_stock();

-- ============================================
-- INVENTORY STATUS UPDATE FUNCTION
-- ============================================

-- Function to update inventory status based on stock level
create or replace function public.update_inventory_status()
returns trigger as $$
begin
  if new.quantity_in_stock = 0 then
    new.status = 'out_of_stock';
  elsif new.quantity_in_stock <= new.reorder_level then
    new.status = 'low_stock';
  elsif new.expiry_date is not null and new.expiry_date < current_date then
    new.status = 'expired';
  else
    new.status = 'active';
  end if;
  
  return new;
end;
$$ language plpgsql;

-- Trigger for inventory status
create trigger update_inventory_status_trigger
  before insert or update on public.inventory
  for each row execute function public.update_inventory_status();

-- ============================================
-- BILLING PAYMENT STATUS UPDATE
-- ============================================

-- Function to update billing payment status
create or replace function public.update_billing_status()
returns trigger as $$
declare
  total_paid numeric;
  bill_total numeric;
begin
  select sum(amount) into total_paid
  from public.payments
  where billing_id = new.billing_id;
  
  select total_amount into bill_total
  from public.billing
  where id = new.billing_id;
  
  if total_paid >= bill_total then
    update public.billing
    set payment_status = 'paid', paid_amount = total_paid
    where id = new.billing_id;
  elsif total_paid > 0 then
    update public.billing
    set payment_status = 'partial', paid_amount = total_paid
    where id = new.billing_id;
  end if;
  
  return new;
end;
$$ language plpgsql security definer;

-- Trigger for payment updates
create trigger on_payment_insert
  after insert on public.payments
  for each row execute function public.update_billing_status();

-- ============================================
-- GENERATE UNIQUE NUMBERS
-- ============================================

-- Function to generate patient number
create or replace function public.generate_patient_number()
returns text as $$
declare
  new_number text;
  counter integer;
begin
  select count(*) + 1 into counter from public.patients;
  new_number := 'PAT' || to_char(current_date, 'YYYYMMDD') || lpad(counter::text, 4, '0');
  return new_number;
end;
$$ language plpgsql;

-- Function to generate prescription number
create or replace function public.generate_prescription_number()
returns text as $$
declare
  new_number text;
  counter integer;
begin
  select count(*) + 1 into counter from public.prescriptions;
  new_number := 'RX' || to_char(current_date, 'YYYYMMDD') || lpad(counter::text, 4, '0');
  return new_number;
end;
$$ language plpgsql;

-- Function to generate invoice number
create or replace function public.generate_invoice_number()
returns text as $$
declare
  new_number text;
  counter integer;
begin
  select count(*) + 1 into counter from public.billing;
  new_number := 'INV' || to_char(current_date, 'YYYYMMDD') || lpad(counter::text, 4, '0');
  return new_number;
end;
$$ language plpgsql;

-- ============================================
-- AUDIT LOGGING FUNCTION
-- ============================================

-- Generic audit logging function
create or replace function public.audit_log()
returns trigger as $$
begin
  if (tg_op = 'DELETE') then
    insert into public.audit_logs (table_name, record_id, action, old_data, performed_by)
    values (tg_table_name, old.id, 'delete', row_to_json(old), auth.uid());
    return old;
  elsif (tg_op = 'UPDATE') then
    insert into public.audit_logs (table_name, record_id, action, old_data, new_data, performed_by)
    values (tg_table_name, new.id, 'update', row_to_json(old), row_to_json(new), auth.uid());
    return new;
  elsif (tg_op = 'INSERT') then
    insert into public.audit_logs (table_name, record_id, action, new_data, performed_by)
    values (tg_table_name, new.id, 'insert', row_to_json(new), auth.uid());
    return new;
  end if;
  return null;
end;
$$ language plpgsql security definer;

-- Apply audit logging to critical tables
create trigger audit_patients
  after insert or update or delete on public.patients
  for each row execute function public.audit_log();

create trigger audit_medical_records
  after insert or update or delete on public.medical_records
  for each row execute function public.audit_log();

create trigger audit_prescriptions
  after insert or update or delete on public.prescriptions
  for each row execute function public.audit_log();

create trigger audit_billing
  after insert or update or delete on public.billing
  for each row execute function public.audit_log();

-- ============================================
-- APPOINTMENT CONFLICT CHECK
-- ============================================

-- Function to check for appointment conflicts
create or replace function public.check_appointment_conflict()
returns trigger as $$
declare
  conflict_count integer;
begin
  select count(*) into conflict_count
  from public.appointments
  where doctor_id = new.doctor_id
    and appointment_date = new.appointment_date
    and status not in ('cancelled', 'no_show')
    and id != coalesce(new.id, '00000000-0000-0000-0000-000000000000'::uuid)
    and (
      (appointment_time, appointment_time + (duration_minutes || ' minutes')::interval)
      overlaps
      (new.appointment_time, new.appointment_time + (new.duration_minutes || ' minutes')::interval)
    );
  
  if conflict_count > 0 then
    raise exception 'Appointment conflict: Doctor already has an appointment at this time';
  end if;
  
  return new;
end;
$$ language plpgsql;

-- Trigger for appointment conflicts
create trigger check_appointment_conflict_trigger
  before insert or update on public.appointments
  for each row execute function public.check_appointment_conflict();
