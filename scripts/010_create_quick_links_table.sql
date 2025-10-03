-- Create Quick Links table
CREATE TABLE IF NOT EXISTS quick_links (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  url TEXT NOT NULL,
  icon TEXT,
  category TEXT DEFAULT 'general' CHECK (category IN ('general', 'emergency', 'services', 'resources', 'external')),
  order_index INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE quick_links ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Active quick links are viewable by everyone" ON quick_links
  FOR SELECT USING (status = 'active' OR EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

CREATE POLICY "Only admins can manage quick links" ON quick_links
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- Create indexes
CREATE INDEX IF NOT EXISTS quick_links_status_idx ON quick_links(status);
CREATE INDEX IF NOT EXISTS quick_links_category_idx ON quick_links(category);
CREATE INDEX IF NOT EXISTS quick_links_order_idx ON quick_links(order_index);

-- Create updated_at trigger
CREATE TRIGGER update_quick_links_updated_at
  BEFORE UPDATE ON quick_links
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
