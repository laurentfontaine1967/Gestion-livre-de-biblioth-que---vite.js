export interface Book {
  ID?: number;
  title: string;
  author: string;
  isbn: string;
  genre: string;
  publicationYear: number;
  publisher: string;
  pages: number;
  description?: string;
  available: boolean;
  coverImage?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface BookFormData {
  title: string;
  author: string;
  isbn: string;
  genre: string;
  publicationYear: number;
  publisher: string;
  pages: number;
  description?: string;
  available: boolean;
  coverImage?: string;
}