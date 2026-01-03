// Database entities
export interface Item {
  id: number;
  title: string;
  type: string;
  created_at: string;
}

export interface Author {
  id: number;
  name: string;
}

// API responses
export interface ItemWithAuthors extends Item {
  authors: Author[];
}
