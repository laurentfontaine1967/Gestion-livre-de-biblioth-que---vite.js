import { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Book, BookFormData } from '@/types/Book';
import { Save, X } from 'lucide-react';

interface BookFormProps {
  book?: Book;
  onSubmit: (data: BookFormData) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

const genres = [
'Fiction',
'Non-fiction',
'Romance',
'Mystère',
'Science-fiction',
'Fantasy',
'Biographie',
'Histoire',
'Science',
'Philosophie',
'Art',
'Cuisine',
'Voyage',
'Santé',
'Religion',
'Jeunesse',
'Autre'];


const BookForm = ({ book, onSubmit, onCancel, isSubmitting = false }: BookFormProps) => {
  const [formData, setFormData] = useState<BookFormData>({
    title: '',
    author: '',
    isbn: '',
    genre: '',
    publicationYear: new Date().getFullYear(),
    publisher: '',
    pages: 1,
    description: '',
    available: true,
    coverImage: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title,
        author: book.author,
        isbn: book.isbn,
        genre: book.genre,
        publicationYear: book.publicationYear,
        publisher: book.publisher,
        pages: book.pages,
        description: book.description || '',
        available: book.available,
        coverImage: book.coverImage || ''
      });
    }
  }, [book]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Le titre est requis';
    }

    if (!formData.author.trim()) {
      newErrors.author = 'L\'auteur est requis';
    }

    if (!formData.isbn.trim()) {
      newErrors.isbn = 'L\'ISBN est requis';
    } else if (!/^[\d-X]+$/.test(formData.isbn.replace(/\s/g, ''))) {
      newErrors.isbn = 'Format ISBN invalide';
    }

    if (!formData.genre) {
      newErrors.genre = 'Le genre est requis';
    }

    if (!formData.publisher.trim()) {
      newErrors.publisher = 'L\'éditeur est requis';
    }

    if (formData.publicationYear < 1000 || formData.publicationYear > new Date().getFullYear() + 1) {
      newErrors.publicationYear = 'Année de publication invalide';
    }

    if (formData.pages < 1) {
      newErrors.pages = 'Le nombre de pages doit être positif';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (field: keyof BookFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <Card className="max-w-2xl mx-auto bg-white/90 backdrop-blur-sm border border-blue-200" data-id="49rogg67d" data-path="src/components/BookForm.tsx">
      <CardHeader data-id="p3pmyp8ev" data-path="src/components/BookForm.tsx">
        <CardTitle className="text-2xl font-bold text-gray-800" data-id="bdc2c0gbn" data-path="src/components/BookForm.tsx">
          {book ? 'Modifier le livre' : 'Nouveau livre'}
        </CardTitle>
      </CardHeader>

      <form onSubmit={handleSubmit} data-id="elo2w0rw7" data-path="src/components/BookForm.tsx">
        <CardContent className="space-y-6" data-id="wuf8r7j7t" data-path="src/components/BookForm.tsx">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-id="ddzn3oeib" data-path="src/components/BookForm.tsx">
            <div className="space-y-2" data-id="owix2zcod" data-path="src/components/BookForm.tsx">
              <Label htmlFor="title" data-id="orziik3fx" data-path="src/components/BookForm.tsx">Titre *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Entrez le titre du livre"
                className={errors.title ? 'border-red-500' : ''} data-id="2e67rumv3" data-path="src/components/BookForm.tsx" />

              {errors.title && <p className="text-red-500 text-sm" data-id="rmg8p2w3u" data-path="src/components/BookForm.tsx">{errors.title}</p>}
            </div>

            <div className="space-y-2" data-id="o1mr0nywb" data-path="src/components/BookForm.tsx">
              <Label htmlFor="author" data-id="5frtmfmn0" data-path="src/components/BookForm.tsx">Auteur *</Label>
              <Input
                id="author"
                value={formData.author}
                onChange={(e) => handleInputChange('author', e.target.value)}
                placeholder="Nom de l'auteur"
                className={errors.author ? 'border-red-500' : ''} data-id="m2dgddrz6" data-path="src/components/BookForm.tsx" />

              {errors.author && <p className="text-red-500 text-sm" data-id="c0vwqzib8" data-path="src/components/BookForm.tsx">{errors.author}</p>}
            </div>

            <div className="space-y-2" data-id="tqoua0stn" data-path="src/components/BookForm.tsx">
              <Label htmlFor="isbn" data-id="pddojwsw2" data-path="src/components/BookForm.tsx">ISBN *</Label>
              <Input
                id="isbn"
                value={formData.isbn}
                onChange={(e) => handleInputChange('isbn', e.target.value)}
                placeholder="978-2-123456-78-9"
                className={errors.isbn ? 'border-red-500' : ''} data-id="zs44skszp" data-path="src/components/BookForm.tsx" />

              {errors.isbn && <p className="text-red-500 text-sm" data-id="wvjbc4nuf" data-path="src/components/BookForm.tsx">{errors.isbn}</p>}
            </div>

            <div className="space-y-2" data-id="06qinxvg9" data-path="src/components/BookForm.tsx">
              <Label htmlFor="genre" data-id="70vfsvc8y" data-path="src/components/BookForm.tsx">Genre *</Label>
              <Select value={formData.genre} onValueChange={(value) => handleInputChange('genre', value)} data-id="28nljnhe3" data-path="src/components/BookForm.tsx">
                <SelectTrigger className={errors.genre ? 'border-red-500' : ''} data-id="nip85zc8l" data-path="src/components/BookForm.tsx">
                  <SelectValue placeholder="Sélectionner un genre" data-id="nzgpcnt8u" data-path="src/components/BookForm.tsx" />
                </SelectTrigger>
                <SelectContent data-id="4cv740f7g" data-path="src/components/BookForm.tsx">
                  {genres.map((genre) =>
                  <SelectItem key={genre} value={genre} data-id="w53pmt8js" data-path="src/components/BookForm.tsx">
                      {genre}
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
              {errors.genre && <p className="text-red-500 text-sm" data-id="xyqpq51w4" data-path="src/components/BookForm.tsx">{errors.genre}</p>}
            </div>

            <div className="space-y-2" data-id="ps3kyf6ws" data-path="src/components/BookForm.tsx">
              <Label htmlFor="publisher" data-id="hrq85iyhg" data-path="src/components/BookForm.tsx">Éditeur *</Label>
              <Input
                id="publisher"
                value={formData.publisher}
                onChange={(e) => handleInputChange('publisher', e.target.value)}
                placeholder="Nom de l'éditeur"
                className={errors.publisher ? 'border-red-500' : ''} data-id="ybelh3iph" data-path="src/components/BookForm.tsx" />

              {errors.publisher && <p className="text-red-500 text-sm" data-id="hbcskc4fv" data-path="src/components/BookForm.tsx">{errors.publisher}</p>}
            </div>

            <div className="space-y-2" data-id="x9p3zibuq" data-path="src/components/BookForm.tsx">
              <Label htmlFor="publicationYear" data-id="p5e0v2864" data-path="src/components/BookForm.tsx">Année de publication *</Label>
              <Input
                id="publicationYear"
                type="number"
                value={formData.publicationYear}
                onChange={(e) => handleInputChange('publicationYear', parseInt(e.target.value) || '')}
                min="1000"
                max={new Date().getFullYear() + 1}
                className={errors.publicationYear ? 'border-red-500' : ''} data-id="v87plgi12" data-path="src/components/BookForm.tsx" />

              {errors.publicationYear && <p className="text-red-500 text-sm" data-id="9g1evrpc3" data-path="src/components/BookForm.tsx">{errors.publicationYear}</p>}
            </div>

            <div className="space-y-2" data-id="vivssef8g" data-path="src/components/BookForm.tsx">
              <Label htmlFor="pages" data-id="gngnf1vvs" data-path="src/components/BookForm.tsx">Nombre de pages *</Label>
              <Input
                id="pages"
                type="number"
                value={formData.pages}
                onChange={(e) => handleInputChange('pages', parseInt(e.target.value) || 1)}
                min="1"
                className={errors.pages ? 'border-red-500' : ''} data-id="fkitbqyuv" data-path="src/components/BookForm.tsx" />

              {errors.pages && <p className="text-red-500 text-sm" data-id="npck3o407" data-path="src/components/BookForm.tsx">{errors.pages}</p>}
            </div>

            <div className="space-y-2" data-id="efkje9qnx" data-path="src/components/BookForm.tsx">
              <Label htmlFor="coverImage" data-id="vrznn2bd5" data-path="src/components/BookForm.tsx">URL de la couverture</Label>
              <Input
                id="coverImage"
                value={formData.coverImage}
                onChange={(e) => handleInputChange('coverImage', e.target.value)}
                placeholder="https://example.com/cover.jpg" data-id="hszqjvvs4" data-path="src/components/BookForm.tsx" />

            </div>
          </div>

          <div className="space-y-2" data-id="um3s17dfm" data-path="src/components/BookForm.tsx">
            <Label htmlFor="description" data-id="zsg7u1sy8" data-path="src/components/BookForm.tsx">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Description du livre"
              rows={4} data-id="f13x7qtg2" data-path="src/components/BookForm.tsx" />

          </div>

          <div className="flex items-center space-x-2" data-id="k6quxdo0d" data-path="src/components/BookForm.tsx">
            <Switch
              id="available"
              checked={formData.available}
              onCheckedChange={(checked) => handleInputChange('available', checked)} data-id="8t6wmbk21" data-path="src/components/BookForm.tsx" />

            <Label htmlFor="available" data-id="3ehcyucb1" data-path="src/components/BookForm.tsx">Livre disponible</Label>
          </div>
        </CardContent>

        <CardFooter className="flex justify-end space-x-2" data-id="ownis5ltl" data-path="src/components/BookForm.tsx">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
            className="flex items-center space-x-2" data-id="bn6fx7muk" data-path="src/components/BookForm.tsx">

            <X className="h-4 w-4" data-id="t4ezqgoxe" data-path="src/components/BookForm.tsx" />
            <span data-id="hx0lte9ji" data-path="src/components/BookForm.tsx">Annuler</span>
          </Button>
          
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center space-x-2" data-id="n3ch7vkaa" data-path="src/components/BookForm.tsx">

            <Save className="h-4 w-4" data-id="6pc86lzta" data-path="src/components/BookForm.tsx" />
            <span data-id="43j3iql5p" data-path="src/components/BookForm.tsx">{isSubmitting ? 'Enregistrement...' : 'Enregistrer'}</span>
          </Button>
        </CardFooter>
      </form>
    </Card>);

};

export default BookForm;