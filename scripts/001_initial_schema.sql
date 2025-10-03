-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create updated_at trigger function
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- ============================================
-- PROFILES TABLE
-- ============================================
create table public.profiles (
  id uuid not null,
  full_name text null,
  email text null,
  phone text null,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  constraint profiles_pkey primary key (id),
  constraint profiles_id_fkey foreign key (id) references auth.users (id) on delete cascade
) tablespace pg_default;

create index if not exists idx_profiles_email on public.profiles using btree (email) tablespace pg_default;

create trigger update_profiles_updated_at 
  before update on profiles 
  for each row
  execute function update_updated_at_column();

-- ============================================
-- STAFF TABLE
-- ============================================
create table public.staff (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade,
  profile_id uuid references public.profiles(id) on delete cascade,
  role text not null check (role in ('admin', 'doctor', 'nurse', 'receptionist', 'pharmacist', 'lab_technician')),
  specialization text null,
  license_number text null,
  department text null,
  employment_status text default 'active' check (employment_status in ('active', 'inactive', 'on_leave')),
  hire_date date null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create index idx_staff_user_id on public.staff(user_id);
create index idx_staff_role on public.staff(role);

create trigger update_staff_updated_at 
  before update on staff 
  for each row
  execute function update_updated_at_column();

-- ============================================
-- PATIENTS TABLE
-- ============================================
create table public.patients (
  id uuid primary key default uuid_generate_v4(),
  patient_number text unique not null,
  full_name text not null,
  date_of_birth date not null,
  gender text check (gender in ('male', 'female', 'other')),
  blood_type text null,
  email text null,
  phone text not null,
  address text null,
  emergency_contact_name text null,
  emergency_contact_phone text null,
  insurance_provider text null,
  insurance_number text null,
  allergies text[] default array[]::text[],
  chronic_conditions text[] default array[]::text[],
  status text default 'active' check (status in ('active', 'inactive', 'deceased')),
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create index idx_patients_patient_number on public.patients(patient_number);
create index idx_patients_phone on public.patients(phone);
create index idx_patients_email on public.patients(email);

create trigger update_patients_updated_at 
  before update on patients 
  for each row
  execute function update_updated_at_column();

-- ============================================
-- APPOINTMENTS TABLE
-- ============================================
create table public.appointments (
  id uuid primary key default uuid_generate_v4(),
  patient_id uuid references public.patients(id) on delete cascade,
  doctor_id uuid references public.staff(id) on delete set null,
  appointment_date date not null,
  appointment_time time not null,
  duration_minutes integer default 30,
  appointment_type text not null check (appointment_type in ('consultation', 'follow_up', 'emergency', 'surgery', 'lab_test', 'vaccination')),
  status text default 'scheduled' check (status in ('scheduled', 'confirmed', 'in_progress', 'completed', 'cancelled', 'no_show')),
  reason text null,
  notes text null,
  created_by uuid references public.staff(id) on delete set null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create index idx_appointments_patient_id on public.appointments(patient_id);
create index idx_appointments_doctor_id on public.appointments(doctor_id);
create index idx_appointments_date on public.appointments(appointment_date);
create index idx_appointments_status on public.appointments(status);

create trigger update_appointments_updated_at 
  before update on appointments 
  for each row
  execute function update_updated_at_column();

-- ============================================
-- MEDICAL RECORDS TABLE
-- ============================================
create table public.medical_records (
  id uuid primary key default uuid_generate_v4(),
  patient_id uuid references public.patients(id) on delete cascade,
  appointment_id uuid references public.appointments(id) on delete set null,
  doctor_id uuid references public.staff(id) on delete set null,
  record_date timestamp with time zone default now(),
  chief_complaint text null,
  symptoms text[] default array[]::text[],
  diagnosis text null,
  treatment_plan text null,
  vital_signs jsonb default '{}'::jsonb,
  lab_results jsonb default '{}'::jsonb,
  imaging_results jsonb default '{}'::jsonb,
  notes text null,
  follow_up_required boolean default false,
  follow_up_date date null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create index idx_medical_records_patient_id on public.medical_records(patient_id);
create index idx_medical_records_doctor_id on public.medical_records(doctor_id);
create index idx_medical_records_date on public.medical_records(record_date);

create trigger update_medical_records_updated_at 
  before update on medical_records 
  for each row
  execute function update_updated_at_column();

-- ============================================
-- PRESCRIPTIONS TABLE
-- ============================================
create table public.prescriptions (
  id uuid primary key default uuid_generate_v4(),
  patient_id uuid references public.patients(id) on delete cascade,
  medical_record_id uuid references public.medical_records(id) on delete set null,
  doctor_id uuid references public.staff(id) on delete set null,
  prescription_number text unique not null,
  medication_name text not null,
  dosage text not null,
  frequency text not null,
  duration text not null,
  quantity integer not null,
  refills_allowed integer default 0,
  instructions text null,
  status text default 'active' check (status in ('active', 'completed', 'cancelled', 'expired')),
  prescribed_date date default current_date,
  expiry_date date null,
  dispensed_by uuid references public.staff(id) on delete set null,
  dispensed_date timestamp with time zone null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create index idx_prescriptions_patient_id on public.prescriptions(patient_id);
create index idx_prescriptions_doctor_id on public.prescriptions(doctor_id);
create index idx_prescriptions_number on public.prescriptions(prescription_number);
create index idx_prescriptions_status on public.prescriptions(status);

create trigger update_prescriptions_updated_at 
  before update on prescriptions 
  for each row
  execute function update_updated_at_column();

-- ============================================
-- BILLING TABLE
-- ============================================
create table public.billing (
  id uuid primary key default uuid_generate_v4(),
  invoice_number text unique not null,
  patient_id uuid references public.patients(id) on delete cascade,
  appointment_id uuid references public.appointments(id) on delete set null,
  billing_date date default current_date,
  due_date date null,
  total_amount numeric(10, 2) not null,
  paid_amount numeric(10, 2) default 0,
  balance numeric(10, 2) generated always as (total_amount - paid_amount) stored,
  payment_status text default 'pending' check (payment_status in ('pending', 'partial', 'paid', 'overdue', 'cancelled')),
  payment_method text null check (payment_method in ('cash', 'card', 'insurance', 'bank_transfer', 'mobile_money')),
  insurance_claim_number text null,
  items jsonb default '[]'::jsonb,
  notes text null,
  created_by uuid references public.staff(id) on delete set null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create index idx_billing_patient_id on public.billing(patient_id);
create index idx_billing_invoice_number on public.billing(invoice_number);
create index idx_billing_status on public.billing(payment_status);
create index idx_billing_date on public.billing(billing_date);

create trigger update_billing_updated_at 
  before update on billing 
  for each row
  execute function update_updated_at_column();

-- ============================================
-- PAYMENTS TABLE
-- ============================================
create table public.payments (
  id uuid primary key default uuid_generate_v4(),
  billing_id uuid references public.billing(id) on delete cascade,
  payment_date timestamp with time zone default now(),
  amount numeric(10, 2) not null,
  payment_method text not null check (payment_method in ('cash', 'card', 'insurance', 'bank_transfer', 'mobile_money')),
  transaction_reference text null,
  received_by uuid references public.staff(id) on delete set null,
  notes text null,
  created_at timestamp with time zone default now()
);

create index idx_payments_billing_id on public.payments(billing_id);
create index idx_payments_date on public.payments(payment_date);

-- ============================================
-- INVENTORY TABLE
-- ============================================
create table public.inventory (
  id uuid primary key default uuid_generate_v4(),
  item_code text unique not null,
  item_name text not null,
  category text not null check (category in ('medication', 'equipment', 'supplies', 'consumables')),
  description text null,
  unit_of_measure text not null,
  quantity_in_stock integer not null default 0,
  reorder_level integer default 10,
  unit_price numeric(10, 2) not null,
  supplier text null,
  expiry_date date null,
  location text null,
  status text default 'active' check (status in ('active', 'low_stock', 'out_of_stock', 'expired', 'discontinued')),
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create index idx_inventory_item_code on public.inventory(item_code);
create index idx_inventory_category on public.inventory(category);
create index idx_inventory_status on public.inventory(status);

create trigger update_inventory_updated_at 
  before update on inventory 
  for each row
  execute function update_updated_at_column();

-- ============================================
-- INVENTORY TRANSACTIONS TABLE
-- ============================================
create table public.inventory_transactions (
  id uuid primary key default uuid_generate_v4(),
  inventory_id uuid references public.inventory(id) on delete cascade,
  transaction_type text not null check (transaction_type in ('purchase', 'usage', 'adjustment', 'return', 'disposal')),
  quantity integer not null,
  unit_price numeric(10, 2) null,
  total_amount numeric(10, 2) null,
  reference_number text null,
  notes text null,
  performed_by uuid references public.staff(id) on delete set null,
  transaction_date timestamp with time zone default now(),
  created_at timestamp with time zone default now()
);

create index idx_inventory_transactions_inventory_id on public.inventory_transactions(inventory_id);
create index idx_inventory_transactions_date on public.inventory_transactions(transaction_date);

-- ============================================
-- SETTINGS TABLE
-- ============================================
create table public.settings (
  id uuid primary key default uuid_generate_v4(),
  key text unique not null,
  value jsonb not null,
  category text not null,
  description text null,
  updated_by uuid references public.staff(id) on delete set null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create index idx_settings_key on public.settings(key);
create index idx_settings_category on public.settings(category);

create trigger update_settings_updated_at 
  before update on settings 
  for each row
  execute function update_updated_at_column();

-- ============================================
-- AUDIT LOG TABLE
-- ============================================
create table public.audit_logs (
  id uuid primary key default uuid_generate_v4(),
  table_name text not null,
  record_id uuid not null,
  action text not null check (action in ('insert', 'update', 'delete')),
  old_data jsonb null,
  new_data jsonb null,
  performed_by uuid references auth.users(id) on delete set null,
  ip_address inet null,
  user_agent text null,
  created_at timestamp with time zone default now()
);

create index idx_audit_logs_table_name on public.audit_logs(table_name);
create index idx_audit_logs_record_id on public.audit_logs(record_id);
create index idx_audit_logs_performed_by on public.audit_logs(performed_by);
create index idx_audit_logs_created_at on public.audit_logs(created_at);
