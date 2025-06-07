import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import BookForm from '@/components/BookForm';
import { BookFormData } from '@/types/Book';
import { bookService } from '@/services/bookService';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft } from 'lucide-react';

const NewBookPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Mutation pour créer un livre
  const createBookMutation = useMutation({
    mutationFn: bookService.createBook,
    onSuccess: (result) => {
      if (result.error) {
        toast({
          title: 'Erreur',
          description: result.error,
          variant: 'destructive'
        });
      } else {
        queryClient.invalidateQueries({ queryKey: ['books'] });
        navigate('/');
        toast({
          title: 'Succès',
          description: 'Livre créé avec succès'
        });
      }
    }
  });

  const handleSubmit = (formData: BookFormData) => {
    createBookMutation.mutate(formData);
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <Layout data-id="oh4b9hdup" data-path="src/pages/NewBookPage.tsx">
      <div className="space-y-6" data-id="kcyudibxx" data-path="src/pages/NewBookPage.tsx">
        {/* Navigation */}
        <div className="flex items-center justify-between" data-id="jjbc72ad4" data-path="src/pages/NewBookPage.tsx">
          <Link to="/" data-id="wer2dabur" data-path="src/pages/NewBookPage.tsx">
            <Button variant="outline" className="flex items-center space-x-2" data-id="0wwozgxw5" data-path="src/pages/NewBookPage.tsx">
              <ArrowLeft className="h-4 w-4" data-id="v7u973hw3" data-path="src/pages/NewBookPage.tsx" />
              <span data-id="stytudxps" data-path="src/pages/NewBookPage.tsx">Retour au catalogue</span>
            </Button>
          </Link>
        </div>

        {/* Formulaire */}
        <div className="max-w-4xl mx-auto" data-id="rrrf5abgk" data-path="src/pages/NewBookPage.tsx">
          <BookForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isSubmitting={createBookMutation.isPending} data-id="42kuvid4h" data-path="src/pages/NewBookPage.tsx" />

        </div>
      </div>
    </Layout>);

};

export default NewBookPage;