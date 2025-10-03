-- Create Hazard Maps table
CREATE TABLE IF NOT EXISTS maps (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  file_url TEXT NOT NULL,
  thumbnail_url TEXT,
  category TEXT,
  tags TEXT,
  location TEXT,
  latitude DECIMAL(10, 8) DEFAULT 0,
  longitude DECIMAL(11, 8) DEFAULT 0,
  zoom_level INTEGER DEFAULT 13,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  uploaded_by UUID REFERENCES profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE maps ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Published maps are viewable by everyone" ON maps
  FOR SELECT USING (status = 'published' OR EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

CREATE POLICY "Only admins can manage maps" ON maps
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- Create indexes
CREATE INDEX IF NOT EXISTS maps_status_idx ON maps(status);
CREATE INDEX IF NOT EXISTS maps_category_idx ON maps(category);
CREATE INDEX IF NOT EXISTS maps_location_idx ON maps(location);

-- Create updated_at trigger
CREATE TRIGGER update_maps_updated_at
  BEFORE UPDATE ON maps
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
