
CREATE TABLE aksinia_messages (
  id SERIAL PRIMARY KEY,
  sender TEXT NOT NULL,
  content TEXT,
  type TEXT NOT NULL DEFAULT 'text',
  file_url TEXT,
  file_name TEXT,
  file_type TEXT,
  duration_sec INTEGER,
  read_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE aksinia_notes ADD COLUMN IF NOT EXISTS file_urls TEXT[] DEFAULT '{}';
