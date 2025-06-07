import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Book, BookFormData } from '@/types/Book';

// Données de démonstration intégrées
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


// Gestion locale du stockage
const STORAGE_KEY = 'library_books';

const getLocalBooks = (): Book[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.warn('Error reading from localStorage:', error);
  }

  // Initialiser avec les données de démonstration
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(demoBooks));
  } catch (error) {
    console.warn('Error writing to localStorage:', error);
  }

  return demoBooks;
};

const saveLocalBooks = (books: Book[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
  } catch (error) {
    console.warn('Error saving to localStorage:', error);
  }
};

// Service de livres simplifié
const localBookService = {
  getBooks: async (): Promise<Book[]> => {
    // Simulation d'un délai API
    await new Promise((resolve) => setTimeout(resolve, 100));
    return getLocalBooks();
  },

  createBook: async (bookData: BookFormData): Promise<Book> => {
    await new Promise((resolve) => setTimeout(resolve, 100));
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
    return newBook;
  },

  updateBook: async (bookData: Book): Promise<Book> => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    if (!bookData.ID) {
      throw new Error('ID du livre requis pour la mise à jour');
    }

    const books = getLocalBooks();
    const index = books.findIndex((b) => b.ID === bookData.ID);
    if (index === -1) {
      throw new Error('Livre non trouvé');
    }

    const updatedBook = {
      ...bookData,
      updatedAt: new Date().toISOString()
    };
    books[index] = updatedBook;
    saveLocalBooks(books);
    return updatedBook;
  },

  deleteBook: async (bookId: number): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const books = getLocalBooks();
    const filteredBooks = books.filter((b) => b.ID !== bookId);
    if (filteredBooks.length === books.length) {
      throw new Error('Livre non trouvé');
    }
    saveLocalBooks(filteredBooks);
  }
};

export const useBooks = () => {
  const queryClient = useQueryClient();

  const booksQuery = useQuery({
    queryKey: ['books'],
    queryFn: localBookService.getBooks,
    retry: false,
    refetchOnWindowFocus: false
  });

  const createBookMutation = useMutation({
    mutationFn: localBookService.createBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
    }
  });

  const updateBookMutation = useMutation({
    mutationFn: localBookService.updateBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
    }
  });

  const deleteBookMutation = useMutation({
    mutationFn: localBookService.deleteBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
    }
  });

  return {
    // Données
    books: booksQuery.data || [],
    isLoading: booksQuery.isLoading,
    error: booksQuery.error,

    // Mutations
    createBook: createBookMutation.mutateAsync,
    updateBook: updateBookMutation.mutateAsync,
    deleteBook: deleteBookMutation.mutateAsync,

    // États des mutations
    isCreating: createBookMutation.isPending,
    isUpdating: updateBookMutation.isPending,
    isDeleting: deleteBookMutation.isPending
  };
};