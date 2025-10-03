-- Create Emergency Hotlines table
CREATE TABLE IF NOT EXISTS hotlines (
  id SERIAL PRIMARY KEY,
  agency TEXT NOT NULL,
  contact_person TEXT,
  phone_number TEXT NOT NULL,
  alternate_number TEXT,
  type TEXT DEFAULT 'emergency' CHECK (type IN ('emergency', 'medical', 'fire', 'police', 'rescue', 'utility', 'government')),
  description TEXT,
  availability TEXT DEFAULT '24/7',
  is_primary BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'maintenance')),
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE hotlines ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Active hotlines are viewable by everyone" ON hotlines
  FOR SELECT USING (status = 'active' OR EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

CREATE POLICY "Only admins can manage hotlines" ON hotlines
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- Create indexes
CREATE INDEX IF NOT EXISTS hotlines_status_idx ON hotlines(status);
CREATE INDEX IF NOT EXISTS hotlines_type_idx ON hotlines(type);
CREATE INDEX IF NOT EXISTS hotlines_is_primary_idx ON hotlines(is_primary);

-- Create updated_at trigger
CREATE TRIGGER update_hotlines_updated_at
  BEFORE UPDATE ON hotlines
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
