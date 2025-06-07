import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import Layout from '@/components/Layout';
import BookCard from '@/components/BookCard';
import BookForm from '@/components/BookForm';
import { Book, BookFormData } from '@/types/Book';
import { useBooks } from '@/hooks/useBooks';
import { useToast } from '@/hooks/use-toast';
import { Search, Filter, Plus, BookOpen } from 'lucide-react';

const BooksPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [availabilityFilter, setAvailabilityFilter] = useState<string>('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | undefined>();

  const { toast } = useToast();
  const {
    books,
    isLoading,
    createBook,
    updateBook,
    deleteBook,
    isCreating,
    isUpdating,
    isDeleting
  } = useBooks();

  // Filtrer les livres
  const filteredBooks = books.filter((book) => {
    const matchesSearch =
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.isbn.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesGenre = selectedGenre === 'all' || book.genre === selectedGenre;

    const matchesAvailability =
    availabilityFilter === 'all' ||
    availabilityFilter === 'available' && book.available ||
    availabilityFilter === 'unavailable' && !book.available;

    return matchesSearch && matchesGenre && matchesAvailability;
  });

  // Obtenir la liste des genres uniques
  const uniqueGenres = Array.from(new Set(books.map((book) => book.genre))).sort();

  const handleSubmit = async (formData: BookFormData) => {
    try {
      if (editingBook) {
        await updateBook({ ...editingBook, ...formData });
        toast({
          title: 'Succès',
          description: 'Livre mis à jour avec succès'
        });
      } else {
        await createBook(formData);
        toast({
          title: 'Succès',
          description: 'Livre créé avec succès'
        });
      }
      setIsFormOpen(false);
      setEditingBook(undefined);
    } catch (error) {
      toast({
        title: 'Erreur',
        description: error instanceof Error ? error.message : 'Une erreur est survenue',
        variant: 'destructive'
      });
    }
  };

  const handleEdit = (book: Book) => {
    setEditingBook(book);
    setIsFormOpen(true);
  };

  const handleDelete = async (bookId: number) => {
    try {
      await deleteBook(bookId);
      toast({
        title: 'Succès',
        description: 'Livre supprimé avec succès'
      });
    } catch (error) {
      toast({
        title: 'Erreur',
        description: error instanceof Error ? error.message : 'Une erreur est survenue',
        variant: 'destructive'
      });
    }
  };

  const handleNewBook = () => {
    setEditingBook(undefined);
    setIsFormOpen(true);
  };

  const handleCancel = () => {
    setIsFormOpen(false);
    setEditingBook(undefined);
  };



  return (
    <Layout data-id="63uvt7ij1" data-path="src/pages/BooksPage.tsx">
      <div className="space-y-6" data-id="3qndn7vk4" data-path="src/pages/BooksPage.tsx">
        {/* En-tête avec statistiques */}
        <div className="bg-white/90 backdrop-blur-sm rounded-lg border border-blue-200 p-6" data-id="t46m5qa9o" data-path="src/pages/BooksPage.tsx">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4" data-id="8h7w4owx3" data-path="src/pages/BooksPage.tsx">
            <div data-id="3p87q49wj" data-path="src/pages/BooksPage.tsx">
              <h1 className="text-3xl font-bold text-gray-800 mb-2" data-id="pqoq2srb6" data-path="src/pages/BooksPage.tsx">Catalogue des Livres</h1>
              <p className="text-gray-600" data-id="hv1pq3zzu" data-path="src/pages/BooksPage.tsx">
                {filteredBooks.length} livre{filteredBooks.length !== 1 ? 's' : ''} trouvé{filteredBooks.length !== 1 ? 's' : ''}
              </p>
            </div>
            <Button onClick={handleNewBook} className="flex items-center space-x-2" data-id="v8fpmyrmd" data-path="src/pages/BooksPage.tsx">
              <Plus className="h-4 w-4" data-id="ovsqfe6zs" data-path="src/pages/BooksPage.tsx" />
              <span data-id="moztzjrk6" data-path="src/pages/BooksPage.tsx">Nouveau Livre</span>
            </Button>
          </div>

          {/* Statistiques rapides */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4" data-id="5oaf26qux" data-path="src/pages/BooksPage.tsx">
            <div className="bg-blue-50 rounded-lg p-4" data-id="exo0p8970" data-path="src/pages/BooksPage.tsx">
              <h3 className="text-sm font-medium text-blue-600" data-id="yghhlh6vc" data-path="src/pages/BooksPage.tsx">Total des livres</h3>
              <p className="text-2xl font-bold text-blue-800" data-id="yvzz0ddxu" data-path="src/pages/BooksPage.tsx">{books.length}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4" data-id="qjp6b81i3" data-path="src/pages/BooksPage.tsx">
              <h3 className="text-sm font-medium text-green-600" data-id="jqmxijai4" data-path="src/pages/BooksPage.tsx">Disponibles</h3>
              <p className="text-2xl font-bold text-green-800" data-id="gz7uagvls" data-path="src/pages/BooksPage.tsx">
                {books.filter((book) => book.available).length}
              </p>
            </div>
            <div className="bg-orange-50 rounded-lg p-4" data-id="opeqcggna" data-path="src/pages/BooksPage.tsx">
              <h3 className="text-sm font-medium text-orange-600" data-id="jy8hjbceb" data-path="src/pages/BooksPage.tsx">Empruntés</h3>
              <p className="text-2xl font-bold text-orange-800" data-id="402w1ywbu" data-path="src/pages/BooksPage.tsx">
                {books.filter((book) => !book.available).length}
              </p>
            </div>
          </div>
        </div>

        {/* Filtres et recherche */}
        <div className="bg-white/90 backdrop-blur-sm rounded-lg border border-blue-200 p-6" data-id="n1lyi4zpi" data-path="src/pages/BooksPage.tsx">
          <div className="flex flex-col md:flex-row gap-4" data-id="9y0db3omu" data-path="src/pages/BooksPage.tsx">
            <div className="flex-1" data-id="3es6h0t31" data-path="src/pages/BooksPage.tsx">
              <div className="relative" data-id="wweumrl16" data-path="src/pages/BooksPage.tsx">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" data-id="6mhmzc17w" data-path="src/pages/BooksPage.tsx" />
                <Input
                  placeholder="Rechercher par titre, auteur ou ISBN..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10" data-id="zkf59tdl2" data-path="src/pages/BooksPage.tsx" />

              </div>
            </div>
            
            <div className="flex gap-2" data-id="f8unmdlv0" data-path="src/pages/BooksPage.tsx">
              <Select value={selectedGenre} onValueChange={setSelectedGenre} data-id="d379j2ftg" data-path="src/pages/BooksPage.tsx">
                <SelectTrigger className="w-[160px]" data-id="s4aoamkc8" data-path="src/pages/BooksPage.tsx">
                  <Filter className="h-4 w-4 mr-2" data-id="gu63u9o3w" data-path="src/pages/BooksPage.tsx" />
                  <SelectValue placeholder="Genre" data-id="biq771jve" data-path="src/pages/BooksPage.tsx" />
                </SelectTrigger>
                <SelectContent data-id="hplggp4n4" data-path="src/pages/BooksPage.tsx">
                  <SelectItem value="all" data-id="7gh1nks4t" data-path="src/pages/BooksPage.tsx">Tous les genres</SelectItem>
                  {uniqueGenres.map((genre) =>
                  <SelectItem key={genre} value={genre} data-id="j4jz140rc" data-path="src/pages/BooksPage.tsx">
                      {genre}
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>

              <Select value={availabilityFilter} onValueChange={setAvailabilityFilter} data-id="xicvtz37c" data-path="src/pages/BooksPage.tsx">
                <SelectTrigger className="w-[140px]" data-id="t8mmsfkf5" data-path="src/pages/BooksPage.tsx">
                  <SelectValue placeholder="Disponibilité" data-id="wvjd617hj" data-path="src/pages/BooksPage.tsx" />
                </SelectTrigger>
                <SelectContent data-id="51s5iqk9k" data-path="src/pages/BooksPage.tsx">
                  <SelectItem value="all" data-id="bhnfi5hgf" data-path="src/pages/BooksPage.tsx">Tous</SelectItem>
                  <SelectItem value="available" data-id="ngu8mhrsb" data-path="src/pages/BooksPage.tsx">Disponibles</SelectItem>
                  <SelectItem value="unavailable" data-id="nmadcps2v" data-path="src/pages/BooksPage.tsx">Empruntés</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Liste des livres */}
        <div className="space-y-4" data-id="8vlievrq4" data-path="src/pages/BooksPage.tsx">
          {isLoading ?
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" data-id="8jcy7di7z" data-path="src/pages/BooksPage.tsx">
              {[...Array(8)].map((_, i) =>
            <div key={i} className="space-y-3" data-id="ctc37t6yh" data-path="src/pages/BooksPage.tsx">
                  <Skeleton className="h-48 w-full rounded-lg" data-id="oeawlk4o7" data-path="src/pages/BooksPage.tsx" />
                  <Skeleton className="h-4 w-3/4" data-id="t3jkgv54z" data-path="src/pages/BooksPage.tsx" />
                  <Skeleton className="h-4 w-1/2" data-id="5glkffgkp" data-path="src/pages/BooksPage.tsx" />
                </div>
            )}
            </div> :
          filteredBooks.length === 0 ?
          <div className="text-center py-12" data-id="i5pi85erm" data-path="src/pages/BooksPage.tsx">
              <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" data-id="uapom4o0w" data-path="src/pages/BooksPage.tsx" />
              <h3 className="text-lg font-medium text-gray-600 mb-2" data-id="w7ujq1tkw" data-path="src/pages/BooksPage.tsx">
                Aucun livre trouvé
              </h3>
              <p className="text-gray-500" data-id="202c6pqo9" data-path="src/pages/BooksPage.tsx">
                {searchTerm || selectedGenre !== 'all' || availabilityFilter !== 'all' ?
              'Essayez de modifier vos filtres de recherche.' :
              'Commencez par ajouter votre premier livre.'}
              </p>
              <Button onClick={handleNewBook} className="mt-4" data-id="yegjwzs5b" data-path="src/pages/BooksPage.tsx">
                <Plus className="h-4 w-4 mr-2" data-id="y7ts7d70n" data-path="src/pages/BooksPage.tsx" />
                Ajouter un livre
              </Button>
            </div> :

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" data-id="z7aetwppq" data-path="src/pages/BooksPage.tsx">
              {filteredBooks.map((book) =>
            <BookCard
              key={book.ID}
              book={book}
              onEdit={handleEdit}
              onDelete={handleDelete} data-id="vw5bgptid" data-path="src/pages/BooksPage.tsx" />

            )}
            </div>
          }
        </div>
      </div>

      {/* Formulaire de livre dans une modal */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen} data-id="pzzmhkc9b" data-path="src/pages/BooksPage.tsx">
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" data-id="ltc03f1wx" data-path="src/pages/BooksPage.tsx">
          <DialogHeader data-id="42dlm3mv4" data-path="src/pages/BooksPage.tsx">
            <DialogTitle data-id="n5pe2tkgx" data-path="src/pages/BooksPage.tsx">
              {editingBook ? 'Modifier le livre' : 'Nouveau livre'}
            </DialogTitle>
          </DialogHeader>
          <BookForm
            book={editingBook}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isSubmitting={isCreating || isUpdating} data-id="x8cjsvxxa" data-path="src/pages/BooksPage.tsx" />

        </DialogContent>
      </Dialog>
    </Layout>);

};

export default BooksPage;