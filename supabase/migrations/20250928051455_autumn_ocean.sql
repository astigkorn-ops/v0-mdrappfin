/*
# Enhanced Admin Management Tables

1. New Tables
   - `admin_audit_logs` - Track all admin actions for accountability
   - `admin_sessions` - Enhanced session management
   - `system_settings` - Configurable system settings
   - `notification_preferences` - User notification settings

2. Enhanced Tables
   - Updated existing tables with audit fields
   - Added soft delete capabilities
   - Improved indexing for performance

3. Security
   - Enhanced RLS policies for admin access
   - Audit trail implementation
   - Session security improvements
*/

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Admin Audit Logs Table
CREATE TABLE IF NOT EXISTS public.admin_audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_id UUID NOT NULL REFERENCES public.profiles(id),
    action VARCHAR(100) NOT NULL,
    table_name VARCHAR(100) NOT NULL,
    record_id TEXT,
    old_values JSONB,
    new_values JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enhanced System Settings Table
CREATE TABLE IF NOT EXISTS public.system_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    setting_key VARCHAR(255) UNIQUE NOT NULL,
    setting_value JSONB NOT NULL,
    setting_type VARCHAR(50) NOT NULL CHECK (setting_type IN ('string', 'number', 'boolean', 'json', 'array')),
    category VARCHAR(100) NOT NULL,
    description TEXT,
    is_public BOOLEAN DEFAULT FALSE,
    is_editable BOOLEAN DEFAULT TRUE,
    created_by UUID NOT NULL REFERENCES public.profiles(id),
    updated_by UUID REFERENCES public.profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Notification Preferences Table
CREATE TABLE IF NOT EXISTS public.notification_preferences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id),
    email_notifications BOOLEAN DEFAULT TRUE,
    sms_notifications BOOLEAN DEFAULT TRUE,
    push_notifications BOOLEAN DEFAULT TRUE,
    incident_alerts BOOLEAN DEFAULT TRUE,
    system_updates BOOLEAN DEFAULT TRUE,
    weekly_reports BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id)
);

-- Enhanced Admin Sessions Table
CREATE TABLE IF NOT EXISTS public.admin_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id),
    session_token TEXT UNIQUE NOT NULL,
    ip_address INET,
    user_agent TEXT,
    last_activity TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add audit fields to existing tables
DO $$
BEGIN
    -- Add audit fields to incident_reports if they don't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'incident_reports' AND column_name = 'created_by') THEN
        ALTER TABLE public.incident_reports 
        ADD COLUMN created_by UUID REFERENCES public.profiles(id),
        ADD COLUMN updated_by UUID REFERENCES public.profiles(id),
        ADD COLUMN deleted_at TIMESTAMP WITH TIME ZONE,
        ADD COLUMN is_deleted BOOLEAN DEFAULT FALSE;
    END IF;

    -- Add audit fields to contact_messages if they don't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'contact_messages' AND column_name = 'assigned_to') THEN
        ALTER TABLE public.contact_messages 
        ADD COLUMN assigned_to UUID REFERENCES public.profiles(id),
        ADD COLUMN responded_by UUID REFERENCES public.profiles(id),
        ADD COLUMN responded_at TIMESTAMP WITH TIME ZONE,
        ADD COLUMN deleted_at TIMESTAMP WITH TIME ZONE,
        ADD COLUMN is_deleted BOOLEAN DEFAULT FALSE;
    END IF;

    -- Add audit fields to volunteer_applications if they don't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'volunteer_applications' AND column_name = 'reviewed_by') THEN
        ALTER TABLE public.volunteer_applications 
        ADD COLUMN reviewed_by UUID REFERENCES public.profiles(id),
        ADD COLUMN reviewed_at TIMESTAMP WITH TIME ZONE,
        ADD COLUMN notes TEXT,
        ADD COLUMN deleted_at TIMESTAMP WITH TIME ZONE,
        ADD COLUMN is_deleted BOOLEAN DEFAULT FALSE;
    END IF;
END $$;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_admin_audit_logs_admin_id ON public.admin_audit_logs(admin_id);
CREATE INDEX IF NOT EXISTS idx_admin_audit_logs_created_at ON public.admin_audit_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_admin_audit_logs_table_name ON public.admin_audit_logs(table_name);
CREATE INDEX IF NOT EXISTS idx_system_settings_category ON public.system_settings(category);
CREATE INDEX IF NOT EXISTS idx_system_settings_key ON public.system_settings(setting_key);
CREATE INDEX IF NOT EXISTS idx_admin_sessions_user_id ON public.admin_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_admin_sessions_active ON public.admin_sessions(is_active, expires_at);

-- Enable RLS on new tables
ALTER TABLE public.admin_audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notification_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_sessions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for admin_audit_logs
CREATE POLICY "Admins can view audit logs" ON public.admin_audit_logs
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() 
            AND email LIKE '%@mdrrmo.gov.ph'
        )
    );

-- RLS Policies for system_settings
CREATE POLICY "Admins can manage system settings" ON public.system_settings
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() 
            AND email LIKE '%@mdrrmo.gov.ph'
        )
    );

CREATE POLICY "Public can view public settings" ON public.system_settings
    FOR SELECT USING (is_public = TRUE);

-- RLS Policies for notification_preferences
CREATE POLICY "Users can manage their notification preferences" ON public.notification_preferences
    FOR ALL USING (user_id = auth.uid());

-- RLS Policies for admin_sessions
CREATE POLICY "Users can view their own sessions" ON public.admin_sessions
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Admins can view all sessions" ON public.admin_sessions
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() 
            AND email LIKE '%@mdrrmo.gov.ph'
        )
    );

-- Function to create audit log entries
CREATE OR REPLACE FUNCTION create_audit_log(
    p_admin_id UUID,
    p_action VARCHAR(100),
    p_table_name VARCHAR(100),
    p_record_id TEXT DEFAULT NULL,
    p_old_values JSONB DEFAULT NULL,
    p_new_values JSONB DEFAULT NULL
) RETURNS UUID AS $$
DECLARE
    audit_id UUID;
BEGIN
    INSERT INTO public.admin_audit_logs (
        admin_id,
        action,
        table_name,
        record_id,
        old_values,
        new_values,
        ip_address,
        user_agent
    ) VALUES (
        p_admin_id,
        p_action,
        p_table_name,
        p_record_id,
        p_old_values,
        p_new_values,
        inet_client_addr(),
        current_setting('request.headers', true)::json->>'user-agent'
    ) RETURNING id INTO audit_id;
    
    RETURN audit_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger function for automatic audit logging
CREATE OR REPLACE FUNCTION audit_trigger_function()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        PERFORM create_audit_log(
            auth.uid(),
            'INSERT',
            TG_TABLE_NAME,
            NEW.id::TEXT,
            NULL,
            to_jsonb(NEW)
        );
        RETURN NEW;
    ELSIF TG_OP = 'UPDATE' THEN
        PERFORM create_audit_log(
            auth.uid(),
            'UPDATE',
            TG_TABLE_NAME,
            NEW.id::TEXT,
            to_jsonb(OLD),
            to_jsonb(NEW)
        );
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        PERFORM create_audit_log(
            auth.uid(),
            'DELETE',
            TG_TABLE_NAME,
            OLD.id::TEXT,
            to_jsonb(OLD),
            NULL
        );
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Apply audit triggers to key tables
CREATE TRIGGER audit_incident_reports_trigger
    AFTER INSERT OR UPDATE OR DELETE ON public.incident_reports
    FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

CREATE TRIGGER audit_contact_messages_trigger
    AFTER INSERT OR UPDATE OR DELETE ON public.contact_messages
    FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

CREATE TRIGGER audit_volunteer_applications_trigger
    AFTER INSERT OR UPDATE OR DELETE ON public.volunteer_applications
    FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

-- Insert default system settings
INSERT INTO public.system_settings (setting_key, setting_value, setting_type, category, description, is_public, created_by) VALUES
('site_name', '"MDRRMO Pio Duran"', 'string', 'general', 'Official site name', TRUE, (SELECT id FROM public.profiles WHERE email LIKE '%@mdrrmo.gov.ph' LIMIT 1)),
('emergency_hotline', '"911"', 'string', 'emergency', 'Primary emergency contact number', TRUE, (SELECT id FROM public.profiles WHERE email LIKE '%@mdrrmo.gov.ph' LIMIT 1)),
('office_address', '"Pio Duran Municipal Hall, Albay"', 'string', 'general', 'Official office address', TRUE, (SELECT id FROM public.profiles WHERE email LIKE '%@mdrrmo.gov.ph' LIMIT 1)),
('max_file_upload_size', '10485760', 'number', 'system', 'Maximum file upload size in bytes (10MB)', FALSE, (SELECT id FROM public.profiles WHERE email LIKE '%@mdrrmo.gov.ph' LIMIT 1)),
('enable_public_registration', 'false', 'boolean', 'system', 'Allow public user registration', FALSE, (SELECT id FROM public.profiles WHERE email LIKE '%@mdrrmo.gov.ph' LIMIT 1)),
('maintenance_mode', 'false', 'boolean', 'system', 'Enable maintenance mode', FALSE, (SELECT id FROM public.profiles WHERE email LIKE '%@mdrrmo.gov.ph' LIMIT 1))
ON CONFLICT (setting_key) DO NOTHING;
