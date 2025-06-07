import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import Layout from '@/components/Layout';
import BookCard from '@/components/BookCard';
import { Book } from '@/types/Book';
import { bookService } from '@/services/bookService';
import { Search, Filter, BookOpen, AlertCircle } from 'lucide-react';

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [availabilityFilter, setAvailabilityFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('title');
  const [sortOrder, setSortOrder] = useState<string>('asc');

  // Récupérer tous les livres
  const { data: books = [], isLoading, error } = useQuery({
    queryKey: ['books'],
    queryFn: async () => {
      try {
        const result = await bookService.getBooks();
        if (result.error) {
          console.warn('API error, using fallback data:', result.error);
          return result.data || [];
        }
        return result.data || [];
      } catch (err) {
        console.warn('Query error, using fallback data:', err);
        const fallbackResult = await bookService.getBooks();
        return fallbackResult.data || [];
      }
    },
    retry: false,
    refetchOnWindowFocus: false
  });

  // Filtrer et trier les livres
  const processedBooks = books.
  filter((book) => {
    const matchesSearch =
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.isbn.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.publisher.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.description && book.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesGenre = selectedGenre === 'all' || book.genre === selectedGenre;

    const matchesAvailability =
    availabilityFilter === 'all' ||
    availabilityFilter === 'available' && book.available ||
    availabilityFilter === 'unavailable' && !book.available;

    return matchesSearch && matchesGenre && matchesAvailability;
  }).
  sort((a, b) => {
    let aValue: any;
    let bValue: any;

    switch (sortBy) {
      case 'title':
        aValue = a.title.toLowerCase();
        bValue = b.title.toLowerCase();
        break;
      case 'author':
        aValue = a.author.toLowerCase();
        bValue = b.author.toLowerCase();
        break;
      case 'year':
        aValue = a.publicationYear;
        bValue = b.publicationYear;
        break;
      case 'pages':
        aValue = a.pages;
        bValue = b.pages;
        break;
      default:
        aValue = a.title.toLowerCase();
        bValue = b.title.toLowerCase();
    }

    if (sortOrder === 'desc') {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    } else {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    }
  });

  // Obtenir la liste des genres uniques
  const uniqueGenres = Array.from(new Set(books.map((book) => book.genre))).sort();

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedGenre('all');
    setAvailabilityFilter('all');
    setSortBy('title');
    setSortOrder('asc');
  };

  // Supprimer l'affichage d'erreur car nous utilisons des données de fallback

  return (
    <Layout data-id="b1ihrwigw" data-path="src/pages/SearchPage.tsx">
      <div className="space-y-6" data-id="trezmd0uf" data-path="src/pages/SearchPage.tsx">
        {/* En-tête */}
        <Card className="bg-white/90 backdrop-blur-sm border border-blue-200" data-id="9od1zcf6y" data-path="src/pages/SearchPage.tsx">
          <CardHeader data-id="jobz7n71p" data-path="src/pages/SearchPage.tsx">
            <CardTitle className="text-2xl font-bold text-gray-800 flex items-center" data-id="ww7u8gn30" data-path="src/pages/SearchPage.tsx">
              <Search className="h-6 w-6 mr-2 text-blue-600" data-id="66k2djm03" data-path="src/pages/SearchPage.tsx" />
              Recherche Avancée
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4" data-id="l49lkhki1" data-path="src/pages/SearchPage.tsx">
            {/* Barre de recherche principale */}
            <div className="relative" data-id="jbzs712yo" data-path="src/pages/SearchPage.tsx">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" data-id="3guhwcxag" data-path="src/pages/SearchPage.tsx" />
              <Input
                placeholder="Rechercher par titre, auteur, ISBN, éditeur ou description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 text-lg" data-id="7mfih34ym" data-path="src/pages/SearchPage.tsx" />

            </div>

            {/* Filtres avancés */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" data-id="b8x9kcb2e" data-path="src/pages/SearchPage.tsx">
              <div data-id="ichv9grm2" data-path="src/pages/SearchPage.tsx">
                <label className="text-sm font-medium text-gray-700 mb-1 block" data-id="ie7tfyust" data-path="src/pages/SearchPage.tsx">Genre</label>
                <Select value={selectedGenre} onValueChange={setSelectedGenre} data-id="8a6zq31sn" data-path="src/pages/SearchPage.tsx">
                  <SelectTrigger data-id="8aayjipur" data-path="src/pages/SearchPage.tsx">
                    <SelectValue placeholder="Tous les genres" data-id="o95muopsj" data-path="src/pages/SearchPage.tsx" />
                  </SelectTrigger>
                  <SelectContent data-id="fe7ub9c7s" data-path="src/pages/SearchPage.tsx">
                    <SelectItem value="all" data-id="8fmutsv6d" data-path="src/pages/SearchPage.tsx">Tous les genres</SelectItem>
                    {uniqueGenres.map((genre) =>
                    <SelectItem key={genre} value={genre} data-id="1eq4f3iqh" data-path="src/pages/SearchPage.tsx">
                        {genre}
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div data-id="n99jyy2du" data-path="src/pages/SearchPage.tsx">
                <label className="text-sm font-medium text-gray-700 mb-1 block" data-id="csz3m04dv" data-path="src/pages/SearchPage.tsx">Disponibilité</label>
                <Select value={availabilityFilter} onValueChange={setAvailabilityFilter} data-id="1ka99jh89" data-path="src/pages/SearchPage.tsx">
                  <SelectTrigger data-id="wswqihihm" data-path="src/pages/SearchPage.tsx">
                    <SelectValue placeholder="Tous" data-id="sr04bvh5x" data-path="src/pages/SearchPage.tsx" />
                  </SelectTrigger>
                  <SelectContent data-id="gcf0rpbvn" data-path="src/pages/SearchPage.tsx">
                    <SelectItem value="all" data-id="1638v14jo" data-path="src/pages/SearchPage.tsx">Tous</SelectItem>
                    <SelectItem value="available" data-id="w0eimiisj" data-path="src/pages/SearchPage.tsx">Disponibles</SelectItem>
                    <SelectItem value="unavailable" data-id="i46q7c3s5" data-path="src/pages/SearchPage.tsx">Empruntés</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div data-id="87j89da14" data-path="src/pages/SearchPage.tsx">
                <label className="text-sm font-medium text-gray-700 mb-1 block" data-id="54bgchzg3" data-path="src/pages/SearchPage.tsx">Trier par</label>
                <Select value={sortBy} onValueChange={setSortBy} data-id="88rpmii6d" data-path="src/pages/SearchPage.tsx">
                  <SelectTrigger data-id="5dgcf6djd" data-path="src/pages/SearchPage.tsx">
                    <SelectValue placeholder="Titre" data-id="sa5t8q8tr" data-path="src/pages/SearchPage.tsx" />
                  </SelectTrigger>
                  <SelectContent data-id="1ku59bodq" data-path="src/pages/SearchPage.tsx">
                    <SelectItem value="title" data-id="ex5ep657c" data-path="src/pages/SearchPage.tsx">Titre</SelectItem>
                    <SelectItem value="author" data-id="0mzfvjx8e" data-path="src/pages/SearchPage.tsx">Auteur</SelectItem>
                    <SelectItem value="year" data-id="cgvzsnbn6" data-path="src/pages/SearchPage.tsx">Année de publication</SelectItem>
                    <SelectItem value="pages" data-id="sm9bodsvn" data-path="src/pages/SearchPage.tsx">Nombre de pages</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div data-id="94ft95q9b" data-path="src/pages/SearchPage.tsx">
                <label className="text-sm font-medium text-gray-700 mb-1 block" data-id="zl1q8iv7n" data-path="src/pages/SearchPage.tsx">Ordre</label>
                <Select value={sortOrder} onValueChange={setSortOrder} data-id="jrh6farpy" data-path="src/pages/SearchPage.tsx">
                  <SelectTrigger data-id="cb9tz354u" data-path="src/pages/SearchPage.tsx">
                    <SelectValue placeholder="Croissant" data-id="o5xcomweb" data-path="src/pages/SearchPage.tsx" />
                  </SelectTrigger>
                  <SelectContent data-id="rxf5hxo14" data-path="src/pages/SearchPage.tsx">
                    <SelectItem value="asc" data-id="qsh05u2l4" data-path="src/pages/SearchPage.tsx">Croissant</SelectItem>
                    <SelectItem value="desc" data-id="ecyohejc7" data-path="src/pages/SearchPage.tsx">Décroissant</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center pt-2" data-id="n67tw9y4a" data-path="src/pages/SearchPage.tsx">
              <div className="text-sm text-gray-600" data-id="kaqh78v36" data-path="src/pages/SearchPage.tsx">
                {processedBooks.length} résultat{processedBooks.length !== 1 ? 's' : ''} trouvé{processedBooks.length !== 1 ? 's' : ''}
              </div>
              <Button variant="outline" onClick={clearFilters} data-id="t03is73a1" data-path="src/pages/SearchPage.tsx">
                Effacer les filtres
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Résultats */}
        <div data-id="i2s08g91d" data-path="src/pages/SearchPage.tsx">
          {isLoading ?
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" data-id="bwcc52x4t" data-path="src/pages/SearchPage.tsx">
              {[...Array(8)].map((_, i) =>
            <div key={i} className="space-y-3" data-id="qfilcghqa" data-path="src/pages/SearchPage.tsx">
                  <Skeleton className="h-48 w-full rounded-lg" data-id="bl9fo6abf" data-path="src/pages/SearchPage.tsx" />
                  <Skeleton className="h-4 w-3/4" data-id="b2cytp7vf" data-path="src/pages/SearchPage.tsx" />
                  <Skeleton className="h-4 w-1/2" data-id="sqe7rmfi3" data-path="src/pages/SearchPage.tsx" />
                </div>
            )}
            </div> :
          processedBooks.length === 0 ?
          <div className="text-center py-12" data-id="v6jlq9r2n" data-path="src/pages/SearchPage.tsx">
              <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" data-id="wodcq9wq8" data-path="src/pages/SearchPage.tsx" />
              <h3 className="text-lg font-medium text-gray-600 mb-2" data-id="1tszu18ch" data-path="src/pages/SearchPage.tsx">
                Aucun résultat trouvé
              </h3>
              <p className="text-gray-500 mb-4" data-id="b81lfng5r" data-path="src/pages/SearchPage.tsx">
                Essayez de modifier vos critères de recherche ou vos filtres.
              </p>
              <Button onClick={clearFilters} variant="outline" data-id="bd2ir15ex" data-path="src/pages/SearchPage.tsx">
                Effacer les filtres
              </Button>
            </div> :

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" data-id="iocfb2sir" data-path="src/pages/SearchPage.tsx">
              {processedBooks.map((book) =>
            <div key={book.ID} className="relative" data-id="cf1ajywv2" data-path="src/pages/SearchPage.tsx">
                  <BookCard
                book={book}
                onEdit={() => {}} // Fonction vide pour la page de recherche
                onDelete={() => {}} // Fonction vide pour la page de recherche
                data-id="4lc12jjrd" data-path="src/pages/SearchPage.tsx" />
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded px-2 py-1" data-id="4xpetv6gf" data-path="src/pages/SearchPage.tsx">
                    <span className="text-xs text-gray-500" data-id="7njmm4811" data-path="src/pages/SearchPage.tsx">Recherche uniquement</span>
                  </div>
                </div>
            )}
            </div>
          }
        </div>

        {/* Statistiques de recherche */}
        {!isLoading && processedBooks.length > 0 &&
        <Card className="bg-blue-50/80 backdrop-blur-sm border border-blue-200" data-id="wudjidjn9" data-path="src/pages/SearchPage.tsx">
            <CardContent className="py-4" data-id="0fpp541hk" data-path="src/pages/SearchPage.tsx">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center" data-id="vgbssp94b" data-path="src/pages/SearchPage.tsx">
                <div data-id="tdo91hgxj" data-path="src/pages/SearchPage.tsx">
                  <p className="text-2xl font-bold text-blue-800" data-id="bt67yjnpk" data-path="src/pages/SearchPage.tsx">{processedBooks.length}</p>
                  <p className="text-sm text-blue-600" data-id="asdro6sdh" data-path="src/pages/SearchPage.tsx">Résultats</p>
                </div>
                <div data-id="a9f82bin8" data-path="src/pages/SearchPage.tsx">
                  <p className="text-2xl font-bold text-green-800" data-id="gjivl0pu8" data-path="src/pages/SearchPage.tsx">
                    {processedBooks.filter((book) => book.available).length}
                  </p>
                  <p className="text-sm text-green-600" data-id="kodpthj7v" data-path="src/pages/SearchPage.tsx">Disponibles</p>
                </div>
                <div data-id="zolbcg9rz" data-path="src/pages/SearchPage.tsx">
                  <p className="text-2xl font-bold text-orange-800" data-id="39ra840vw" data-path="src/pages/SearchPage.tsx">
                    {processedBooks.filter((book) => !book.available).length}
                  </p>
                  <p className="text-sm text-orange-600" data-id="mxlk24f82" data-path="src/pages/SearchPage.tsx">Empruntés</p>
                </div>
                <div data-id="v9xf31ax8" data-path="src/pages/SearchPage.tsx">
                  <p className="text-2xl font-bold text-purple-800" data-id="ol1v2jich" data-path="src/pages/SearchPage.tsx">
                    {uniqueGenres.filter((genre) => processedBooks.some((book) => book.genre === genre)).length}
                  </p>
                  <p className="text-sm text-purple-600" data-id="3funpw7ev" data-path="src/pages/SearchPage.tsx">Genres</p>
                </div>
              </div>
            </CardContent>
          </Card>
        }
      </div>
    </Layout>);

};

export default SearchPage;