-- Create items table
CREATE TABLE IF NOT EXISTS items (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  type TEXT NOT NULL
);

-- Create authors table
CREATE TABLE IF NOT EXISTS authors (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

-- Create item_authors junction table
CREATE TABLE IF NOT EXISTS item_authors (
  item_id INT NOT NULL REFERENCES items(id) ON DELETE CASCADE,
  author_id INT NOT NULL REFERENCES authors(id) ON DELETE CASCADE,
  PRIMARY KEY (item_id, author_id)
);
