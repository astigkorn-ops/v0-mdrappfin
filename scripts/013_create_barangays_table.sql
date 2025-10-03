-- Create Barangays table for barangay portal
CREATE TABLE IF NOT EXISTS barangays (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  code TEXT UNIQUE,
  captain TEXT,
  contact_number TEXT,
  email TEXT,
  address TEXT,
  population INTEGER,
  households INTEGER,
  area_sqkm DECIMAL(10, 2),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE barangays ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Barangays are viewable by everyone" ON barangays
  FOR SELECT USING (true);

CREATE POLICY "Only admins can manage barangays" ON barangays
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- Create indexes
CREATE INDEX IF NOT EXISTS barangays_name_idx ON barangays(name);
CREATE INDEX IF NOT EXISTS barangays_status_idx ON barangays(status);

-- Create updated_at trigger
CREATE TRIGGER update_barangays_updated_at
  BEFORE UPDATE ON barangays
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
