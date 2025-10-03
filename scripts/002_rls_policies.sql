-- ============================================
-- ENABLE ROW LEVEL SECURITY
-- ============================================

alter table public.profiles enable row level security;
alter table public.staff enable row level security;
alter table public.patients enable row level security;
alter table public.appointments enable row level security;
alter table public.medical_records enable row level security;
alter table public.prescriptions enable row level security;
alter table public.billing enable row level security;
alter table public.payments enable row level security;
alter table public.inventory enable row level security;
alter table public.inventory_transactions enable row level security;
alter table public.settings enable row level security;
alter table public.audit_logs enable row level security;

-- ============================================
-- HELPER FUNCTIONS FOR RLS
-- ============================================

-- Function to get current user's role
create or replace function public.get_user_role()
returns text as $$
  select role from public.staff where user_id = auth.uid() limit 1;
$$ language sql security definer;

-- Function to check if user is admin
create or replace function public.is_admin()
returns boolean as $$
  select exists (
    select 1 from public.staff 
    where user_id = auth.uid() and role = 'admin'
  );
$$ language sql security definer;

-- Function to check if user is doctor
create or replace function public.is_doctor()
returns boolean as $$
  select exists (
    select 1 from public.staff 
    where user_id = auth.uid() and role = 'doctor'
  );
$$ language sql security definer;

-- Function to check if user is staff member
create or replace function public.is_staff()
returns boolean as $$
  select exists (
    select 1 from public.staff where user_id = auth.uid()
  );
$$ language sql security definer;

-- ============================================
-- PROFILES POLICIES
-- ============================================

-- Users can view their own profile
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

-- Users can update their own profile
create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Staff can view all profiles
create policy "Staff can view all profiles"
  on public.profiles for select
  using (is_staff());

-- Admins can insert profiles
create policy "Admins can insert profiles"
  on public.profiles for insert
  with check (is_admin());

-- ============================================
-- STAFF POLICIES
-- ============================================

-- Staff can view their own record
create policy "Staff can view own record"
  on public.staff for select
  using (user_id = auth.uid());

-- Admins can view all staff
create policy "Admins can view all staff"
  on public.staff for select
  using (is_admin());

-- Admins can insert staff
create policy "Admins can insert staff"
  on public.staff for insert
  with check (is_admin());

-- Admins can update staff
create policy "Admins can update staff"
  on public.staff for update
  using (is_admin());

-- Admins can delete staff
create policy "Admins can delete staff"
  on public.staff for delete
  using (is_admin());

-- ============================================
-- PATIENTS POLICIES
-- ============================================

-- Staff can view all patients
create policy "Staff can view patients"
  on public.patients for select
  using (is_staff());

-- Staff can insert patients
create policy "Staff can insert patients"
  on public.patients for insert
  with check (is_staff());

-- Staff can update patients
create policy "Staff can update patients"
  on public.patients for update
  using (is_staff());

-- Only admins can delete patients
create policy "Admins can delete patients"
  on public.patients for delete
  using (is_admin());

-- ============================================
-- APPOINTMENTS POLICIES
-- ============================================

-- Staff can view all appointments
create policy "Staff can view appointments"
  on public.appointments for select
  using (is_staff());

-- Staff can create appointments
create policy "Staff can create appointments"
  on public.appointments for insert
  with check (is_staff());

-- Staff can update appointments
create policy "Staff can update appointments"
  on public.appointments for update
  using (is_staff());

-- Admins can delete appointments
create policy "Admins can delete appointments"
  on public.appointments for delete
  using (is_admin());

-- ============================================
-- MEDICAL RECORDS POLICIES
-- ============================================

-- Doctors can view all medical records
create policy "Doctors can view medical records"
  on public.medical_records for select
  using (is_doctor() or is_admin());

-- Doctors can create medical records
create policy "Doctors can create medical records"
  on public.medical_records for insert
  with check (is_doctor() or is_admin());

-- Doctors can update their own medical records
create policy "Doctors can update own medical records"
  on public.medical_records for update
  using (
    doctor_id in (select id from public.staff where user_id = auth.uid())
    or is_admin()
  );

-- Only admins can delete medical records
create policy "Admins can delete medical records"
  on public.medical_records for delete
  using (is_admin());

-- ============================================
-- PRESCRIPTIONS POLICIES
-- ============================================

-- Doctors and pharmacists can view prescriptions
create policy "Medical staff can view prescriptions"
  on public.prescriptions for select
  using (
    get_user_role() in ('doctor', 'pharmacist', 'admin')
  );

-- Doctors can create prescriptions
create policy "Doctors can create prescriptions"
  on public.prescriptions for insert
  with check (is_doctor() or is_admin());

-- Doctors can update their own prescriptions
create policy "Doctors can update own prescriptions"
  on public.prescriptions for update
  using (
    doctor_id in (select id from public.staff where user_id = auth.uid())
    or is_admin()
  );

-- Pharmacists can update prescription status
create policy "Pharmacists can update prescription status"
  on public.prescriptions for update
  using (get_user_role() in ('pharmacist', 'admin'));

-- ============================================
-- BILLING POLICIES
-- ============================================

-- Staff can view billing records
create policy "Staff can view billing"
  on public.billing for select
  using (is_staff());

-- Staff can create billing records
create policy "Staff can create billing"
  on public.billing for insert
  with check (is_staff());

-- Staff can update billing records
create policy "Staff can update billing"
  on public.billing for update
  using (is_staff());

-- Admins can delete billing records
create policy "Admins can delete billing"
  on public.billing for delete
  using (is_admin());

-- ============================================
-- PAYMENTS POLICIES
-- ============================================

-- Staff can view payments
create policy "Staff can view payments"
  on public.payments for select
  using (is_staff());

-- Staff can create payments
create policy "Staff can create payments"
  on public.payments for insert
  with check (is_staff());

-- Only admins can delete payments
create policy "Admins can delete payments"
  on public.payments for delete
  using (is_admin());

-- ============================================
-- INVENTORY POLICIES
-- ============================================

-- Staff can view inventory
create policy "Staff can view inventory"
  on public.inventory for select
  using (is_staff());

-- Admins and pharmacists can manage inventory
create policy "Authorized staff can insert inventory"
  on public.inventory for insert
  with check (get_user_role() in ('admin', 'pharmacist'));

create policy "Authorized staff can update inventory"
  on public.inventory for update
  using (get_user_role() in ('admin', 'pharmacist'));

create policy "Admins can delete inventory"
  on public.inventory for delete
  using (is_admin());

-- ============================================
-- INVENTORY TRANSACTIONS POLICIES
-- ============================================

-- Staff can view inventory transactions
create policy "Staff can view inventory transactions"
  on public.inventory_transactions for select
  using (is_staff());

-- Authorized staff can create transactions
create policy "Authorized staff can create transactions"
  on public.inventory_transactions for insert
  with check (get_user_role() in ('admin', 'pharmacist'));

-- ============================================
-- SETTINGS POLICIES
-- ============================================

-- Staff can view settings
create policy "Staff can view settings"
  on public.settings for select
  using (is_staff());

-- Only admins can manage settings
create policy "Admins can insert settings"
  on public.settings for insert
  with check (is_admin());

create policy "Admins can update settings"
  on public.settings for update
  using (is_admin());

create policy "Admins can delete settings"
  on public.settings for delete
  using (is_admin());

-- ============================================
-- AUDIT LOGS POLICIES
-- ============================================

-- Only admins can view audit logs
create policy "Admins can view audit logs"
  on public.audit_logs for select
  using (is_admin());

-- System can insert audit logs
create policy "System can insert audit logs"
  on public.audit_logs for insert
  with check (true);
