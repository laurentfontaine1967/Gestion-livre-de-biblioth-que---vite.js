import { Book, BookFormData } from '@/types/Book';

declare global {
  interface Window {
    ezsite: {
      apis: {
        createTableRecord: (tableId: string, data: any) => Promise<{data?: any;error?: string;}>;
        getTableRecords: (tableId: string, params?: any) => Promise<{data?: any[];error?: string;}>;
        updateTableRecord: (tableId: string, data: any) => Promise<{data?: any;error?: string;}>;
        deleteTableRecord: (tableId: string, data: {ID: number;}) => Promise<{data?: any;error?: string;}>;
      };
    };
  }
}

const BOOKS_TABLE_ID = 'books';

// Données de démonstration
const demoBooks: Book[] = [
{
  ID: 1,
  title: "Le Petit Prince",
  author: "Antoine de Saint-Exupéry",
  isbn: "978-2-07-040848-4",
  genre: "Fiction",
  publicationYear: 1943,
  publisher: "Gallimard",
  pages: 96,
  description: "Un conte poétique et philosophique sous l'apparence d'un conte pour enfants.",
  available: true,
  coverImage: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop"
},
{
  ID: 2,
  title: "1984",
  author: "George Orwell",
  isbn: "978-2-07-036822-5",
  genre: "Science-fiction",
  publicationYear: 1949,
  publisher: "Gallimard",
  pages: 439,
  description: "Un roman dystopique qui dépeint une société totalitaire où la pensée est contrôlée.",
  available: false,
  coverImage: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=400&fit=crop"
},
{
  ID: 3,
  title: "L'Étranger",
  author: "Albert Camus",
  isbn: "978-2-07-036002-1",
  genre: "Fiction",
  publicationYear: 1942,
  publisher: "Gallimard",
  pages: 186,
  description: "L'histoire de Meursault, un homme indifférent qui commet un meurtre absurde.",
  available: true,
  coverImage: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=300&h=400&fit=crop"
},
{
  ID: 4,
  title: "Les Misérables",
  author: "Victor Hugo",
  isbn: "978-2-07-040785-2",
  genre: "Fiction",
  publicationYear: 1862,
  publisher: "Gallimard",
  pages: 1232,
  description: "L'épopée de Jean Valjean dans la France du XIXe siècle.",
  available: true,
  coverImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop"
},
{
  ID: 5,
  title: "Madame Bovary",
  author: "Gustave Flaubert",
  isbn: "978-2-07-036173-8",
  genre: "Fiction",
  publicationYear: 1857,
  publisher: "Gallimard",
  pages: 464,
  description: "L'histoire d'Emma Bovary, une femme qui rêve d'une vie plus passionnante.",
  available: false,
  coverImage: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop"
}];


// Simuler un stockage local pour les démonstrations
const getLocalBooks = (): Book[] => {
  const stored = localStorage.getItem('library_books');
  if (stored) {
    return JSON.parse(stored);
  }
  // Initialiser avec les données de démonstration
  localStorage.setItem('library_books', JSON.stringify(demoBooks));
  return demoBooks;
};

const saveLocalBooks = (books: Book[]): void => {
  localStorage.setItem('library_books', JSON.stringify(books));
};

const isApiAvailable = (): boolean => {
  return typeof window !== 'undefined' && window.ezsite && window.ezsite.apis;
};

export const bookService = {
  // Créer un nouveau livre
  async createBook(bookData: BookFormData): Promise<{data?: Book;error?: string;}> {
    try {
      if (!isApiAvailable()) {
        // Utiliser le stockage local si l'API n'est pas disponible
        const books = getLocalBooks();
        const newBook: Book = {
          ...bookData,
          ID: Math.max(0, ...books.map((b) => b.ID || 0)) + 1,
          available: bookData.available ?? true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        books.push(newBook);
        saveLocalBooks(books);
        return { data: newBook };
      }
      const result = await window.ezsite.apis.createTableRecord(BOOKS_TABLE_ID, {
        ...bookData,
        available: bookData.available ?? true
      });
      return result;
    } catch (error) {
      console.error('Error creating book:', error);
      // Fallback vers le stockage local
      const books = getLocalBooks();
      const newBook: Book = {
        ...bookData,
        ID: Math.max(0, ...books.map((b) => b.ID || 0)) + 1,
        available: bookData.available ?? true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      books.push(newBook);
      saveLocalBooks(books);
      return { data: newBook };
    }
  },

  // Récupérer tous les livres
  async getBooks(): Promise<{data?: Book[];error?: string;}> {
    try {
      if (!isApiAvailable()) {
        // Utiliser les données locales si l'API n'est pas disponible
        console.log('API not available, using local storage');
        const books = getLocalBooks();
        return { data: books };
      }
      const result = await window.ezsite.apis.getTableRecords(BOOKS_TABLE_ID);
      return result;
    } catch (error) {
      console.error('Error fetching books:', error);
      // Fallback vers les données locales en cas d'erreur
      const books = getLocalBooks();
      return { data: books };
    }
  },

  // Mettre à jour un livre
  async updateBook(bookData: Book): Promise<{data?: Book;error?: string;}> {
    try {
      if (!bookData.ID) {
        return { error: 'ID du livre requis pour la mise à jour' };
      }

      if (!isApiAvailable()) {
        // Utiliser le stockage local si l'API n'est pas disponible
        const books = getLocalBooks();
        const index = books.findIndex((b) => b.ID === bookData.ID);
        if (index === -1) {
          return { error: 'Livre non trouvé' };
        }
        const updatedBook = {
          ...bookData,
          updatedAt: new Date().toISOString()
        };
        books[index] = updatedBook;
        saveLocalBooks(books);
        return { data: updatedBook };
      }

      const result = await window.ezsite.apis.updateTableRecord(BOOKS_TABLE_ID, bookData);
      return result;
    } catch (error) {
      console.error('Error updating book:', error);
      // Fallback vers le stockage local
      const books = getLocalBooks();
      const index = books.findIndex((b) => b.ID === bookData.ID);
      if (index === -1) {
        return { error: 'Livre non trouvé' };
      }
      const updatedBook = {
        ...bookData,
        updatedAt: new Date().toISOString()
      };
      books[index] = updatedBook;
      saveLocalBooks(books);
      return { data: updatedBook };
    }
  },

  // Supprimer un livre
  async deleteBook(bookId: number): Promise<{data?: any;error?: string;}> {
    try {
      if (!isApiAvailable()) {
        // Utiliser le stockage local si l'API n'est pas disponible
        const books = getLocalBooks();
        const filteredBooks = books.filter((b) => b.ID !== bookId);
        if (filteredBooks.length === books.length) {
          return { error: 'Livre non trouvé' };
        }
        saveLocalBooks(filteredBooks);
        return { data: { success: true } };
      }

      const result = await window.ezsite.apis.deleteTableRecord(BOOKS_TABLE_ID, { ID: bookId });
      return result;
    } catch (error) {
      console.error('Error deleting book:', error);
      // Fallback vers le stockage local
      const books = getLocalBooks();
      const filteredBooks = books.filter((b) => b.ID !== bookId);
      if (filteredBooks.length === books.length) {
        return { error: 'Livre non trouvé' };
      }
      saveLocalBooks(filteredBooks);
      return { data: { success: true } };
    }
  }
};