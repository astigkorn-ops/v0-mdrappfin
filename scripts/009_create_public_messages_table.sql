-- Create Public Messages table
CREATE TABLE IF NOT EXISTS public_messages (
  id SERIAL PRIMARY KEY,
  sender_name TEXT NOT NULL,
  sender_email TEXT NOT NULL,
  sender_phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  category TEXT DEFAULT 'general' CHECK (category IN ('general', 'inquiry', 'complaint', 'suggestion', 'emergency')),
  status TEXT DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied', 'archived')),
  priority TEXT DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public_messages ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can send public messages" ON public_messages
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Only admins can view public messages" ON public_messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Only admins can update public messages" ON public_messages
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- Create indexes
CREATE INDEX IF NOT EXISTS public_messages_status_idx ON public_messages(status);
CREATE INDEX IF NOT EXISTS public_messages_category_idx ON public_messages(category);
CREATE INDEX IF NOT EXISTS public_messages_priority_idx ON public_messages(priority);

-- Create updated_at trigger
CREATE TRIGGER update_public_messages_updated_at
  BEFORE UPDATE ON public_messages
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
