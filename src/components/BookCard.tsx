import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Book } from '@/types/Book';
import { Edit, Trash2, BookOpen, Calendar, User, Hash } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BookCardProps {
  book: Book;
  onDelete: (id: number) => void;
  onEdit: (book: Book) => void;
}

const BookCard = ({ book, onDelete, onEdit }: BookCardProps) => {
  const handleDelete = () => {
    if (book.ID && window.confirm('Êtes-vous sûr de vouloir supprimer ce livre ?')) {
      onDelete(book.ID);
    }
  };

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-all duration-300 hover:scale-[1.02] bg-white/80 backdrop-blur-sm border border-blue-200" data-id="s213w962l" data-path="src/components/BookCard.tsx">
      <CardHeader className="pb-3" data-id="xebe2yqru" data-path="src/components/BookCard.tsx">
        <div className="flex justify-between items-start" data-id="mn7e494cr" data-path="src/components/BookCard.tsx">
          <CardTitle className="text-lg font-semibold text-gray-800 line-clamp-2" data-id="8wkh2oewm" data-path="src/components/BookCard.tsx">
            {book.title}
          </CardTitle>
          <Badge variant={book.available ? 'default' : 'destructive'} className="ml-2" data-id="z1yipzabb" data-path="src/components/BookCard.tsx">
            {book.available ? 'Disponible' : 'Emprunté'}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 space-y-3" data-id="x53jmdn4h" data-path="src/components/BookCard.tsx">
        <div className="space-y-2 text-sm text-gray-600" data-id="syvhdg5l2" data-path="src/components/BookCard.tsx">
          <div className="flex items-center space-x-2" data-id="oijmy4p3w" data-path="src/components/BookCard.tsx">
            <User className="h-4 w-4 text-blue-500" data-id="kjlagxxfb" data-path="src/components/BookCard.tsx" />
            <span className="font-medium" data-id="gng1oniio" data-path="src/components/BookCard.tsx">{book.author}</span>
          </div>
          
          <div className="flex items-center space-x-2" data-id="x9srv3yj9" data-path="src/components/BookCard.tsx">
            <Calendar className="h-4 w-4 text-blue-500" data-id="6tjq99za2" data-path="src/components/BookCard.tsx" />
            <span data-id="j9s2l0xdh" data-path="src/components/BookCard.tsx">{book.publicationYear}</span>
          </div>
          
          <div className="flex items-center space-x-2" data-id="glf4mm839" data-path="src/components/BookCard.tsx">
            <Hash className="h-4 w-4 text-blue-500" data-id="49o0snfnx" data-path="src/components/BookCard.tsx" />
            <span className="font-mono text-xs" data-id="g4vg3m1zk" data-path="src/components/BookCard.tsx">{book.isbn}</span>
          </div>
          
          <div className="flex items-center space-x-2" data-id="v24nxtigs" data-path="src/components/BookCard.tsx">
            <BookOpen className="h-4 w-4 text-blue-500" data-id="yqvvq3fvz" data-path="src/components/BookCard.tsx" />
            <span data-id="ztf9cr5aa" data-path="src/components/BookCard.tsx">{book.pages} pages</span>
          </div>
        </div>

        <div data-id="mt54md76o" data-path="src/components/BookCard.tsx">
          <Badge variant="outline" className="text-xs" data-id="8ldim6fhp" data-path="src/components/BookCard.tsx">
            {book.genre}
          </Badge>
        </div>

        {book.description &&
        <p className="text-sm text-gray-600 line-clamp-3" data-id="gyfj5xsvr" data-path="src/components/BookCard.tsx">
            {book.description}
          </p>
        }
      </CardContent>

      <CardFooter className="pt-4 border-t border-gray-100" data-id="z06q75sj7" data-path="src/components/BookCard.tsx">
        <div className="flex justify-between w-full space-x-2" data-id="p8iynqcyn" data-path="src/components/BookCard.tsx">
          <Link to={`/books/${book.ID}`} className="flex-1" data-id="jrqvja7nx" data-path="src/components/BookCard.tsx">
            <Button variant="outline" size="sm" className="w-full" data-id="g6mwps8mf" data-path="src/components/BookCard.tsx">
              Détails
            </Button>
          </Link>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(book)}
            className="flex items-center space-x-1" data-id="5w9snglhb" data-path="src/components/BookCard.tsx">

            <Edit className="h-3 w-3" data-id="ia3ixjau7" data-path="src/components/BookCard.tsx" />
            <span data-id="qe6ebexmf" data-path="src/components/BookCard.tsx">Modifier</span>
          </Button>
          
          <Button
            variant="destructive"
            size="sm"
            onClick={handleDelete}
            className="flex items-center space-x-1" data-id="hg496yd7s" data-path="src/components/BookCard.tsx">

            <Trash2 className="h-3 w-3" data-id="60vq08xjw" data-path="src/components/BookCard.tsx" />
            <span data-id="9u1eiuuvu" data-path="src/components/BookCard.tsx">Supprimer</span>
          </Button>
        </div>
      </CardFooter>
    </Card>);

};

export default BookCard;