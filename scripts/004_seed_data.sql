-- ============================================
-- SEED DATA FOR TESTING
-- ============================================

-- Insert default settings
insert into public.settings (key, value, category, description) values
  ('clinic_name', '"Medical Clinic"', 'general', 'Name of the clinic'),
  ('clinic_address', '"123 Health Street, Medical City"', 'general', 'Clinic address'),
  ('clinic_phone', '"+1234567890"', 'general', 'Clinic phone number'),
  ('clinic_email', '"info@medicalclinic.com"', 'general', 'Clinic email'),
  ('appointment_duration', '30', 'appointments', 'Default appointment duration in minutes'),
  ('working_hours_start', '"08:00"', 'appointments', 'Clinic opening time'),
  ('working_hours_end', '"18:00"', 'appointments', 'Clinic closing time'),
  ('currency', '"USD"', 'billing', 'Default currency'),
  ('tax_rate', '0', 'billing', 'Tax rate percentage'),
  ('low_stock_threshold', '10', 'inventory', 'Default low stock threshold')
on conflict (key) do nothing;

-- Note: Staff members should be created through the application
-- after users sign up, as they need to be linked to auth.users
