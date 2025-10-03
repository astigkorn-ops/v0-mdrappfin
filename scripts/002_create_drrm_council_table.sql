-- Create DRRM Council members table
CREATE TABLE IF NOT EXISTS drrm_council (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  position TEXT NOT NULL,
  department TEXT,
  email TEXT,
  phone TEXT,
  avatar_url TEXT,
  bio TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE drrm_council ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "DRRM Council members are viewable by everyone" ON drrm_council
  FOR SELECT USING (true);

CREATE POLICY "Only admins can insert DRRM Council members" ON drrm_council
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Only admins can update DRRM Council members" ON drrm_council
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Only admins can delete DRRM Council members" ON drrm_council
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- Create indexes
CREATE INDEX IF NOT EXISTS drrm_council_status_idx ON drrm_council(status);
CREATE INDEX IF NOT EXISTS drrm_council_order_idx ON drrm_council(order_index);

-- Create updated_at trigger
CREATE TRIGGER update_drrm_council_updated_at
  BEFORE UPDATE ON drrm_council
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
