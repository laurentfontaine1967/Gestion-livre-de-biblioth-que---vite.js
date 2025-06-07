import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import Layout from '@/components/Layout';
import BookForm from '@/components/BookForm';
import { Book, BookFormData } from '@/types/Book';
import { useBooks } from '@/hooks/useBooks';
import { useToast } from '@/hooks/use-toast';
import {
  ArrowLeft,
  Edit,
  Trash2,
  BookOpen,
  Calendar,
  User,
  Hash,
  Building,
  FileText,
  AlertCircle } from
'lucide-react';

const BookDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const { toast } = useToast();

  const bookId = id ? parseInt(id) : null;

  const { books, isLoading, updateBook, deleteBook, isUpdating, isDeleting } = useBooks();

  // Trouver le livre spécifique
  const book = books.find((b) => b.ID === bookId);

  const handleEdit = () => {
    setIsEditFormOpen(true);
  };

  const handleDelete = async () => {
    if (book && window.confirm('Êtes-vous sûr de vouloir supprimer ce livre ?')) {
      try {
        await deleteBook(book.ID!);
        navigate('/');
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
    }
  };

  const handleSubmit = async (formData: BookFormData) => {
    if (book) {
      try {
        await updateBook({ ...book, ...formData });
        setIsEditFormOpen(false);
        toast({
          title: 'Succès',
          description: 'Livre mis à jour avec succès'
        });
      } catch (error) {
        toast({
          title: 'Erreur',
          description: error instanceof Error ? error.message : 'Une erreur est survenue',
          variant: 'destructive'
        });
      }
    }
  };

  const handleCancel = () => {
    setIsEditFormOpen(false);
  };

  if (!bookId) {
    return (
      <Layout data-id="arr3lc4aa" data-path="src/pages/BookDetailsPage.tsx">
        <Alert variant="destructive" data-id="crd79jimt" data-path="src/pages/BookDetailsPage.tsx">
          <AlertCircle className="h-4 w-4" data-id="1huwqymol" data-path="src/pages/BookDetailsPage.tsx" />
          <AlertDescription data-id="0f3244vw6" data-path="src/pages/BookDetailsPage.tsx">
            ID de livre invalide
          </AlertDescription>
        </Alert>
      </Layout>);

  }



  if (isLoading) {
    return (
      <Layout data-id="kl4fualws" data-path="src/pages/BookDetailsPage.tsx">
        <div className="space-y-6" data-id="kl3yaxfhc" data-path="src/pages/BookDetailsPage.tsx">
          <Skeleton className="h-8 w-64" data-id="vlbgfbwvv" data-path="src/pages/BookDetailsPage.tsx" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" data-id="qlk7uv87s" data-path="src/pages/BookDetailsPage.tsx">
            <div className="lg:col-span-2 space-y-4" data-id="xj8edym6w" data-path="src/pages/BookDetailsPage.tsx">
              <Skeleton className="h-96 w-full rounded-lg" data-id="rreodoghw" data-path="src/pages/BookDetailsPage.tsx" />
            </div>
            <div className="space-y-4" data-id="lkyafl1al" data-path="src/pages/BookDetailsPage.tsx">
              <Skeleton className="h-48 w-full rounded-lg" data-id="hrwu05v0a" data-path="src/pages/BookDetailsPage.tsx" />
              <Skeleton className="h-32 w-full rounded-lg" data-id="t405bu04q" data-path="src/pages/BookDetailsPage.tsx" />
            </div>
          </div>
        </div>
      </Layout>);

  }

  if (!book) {
    return (
      <Layout data-id="v4yu18ud8" data-path="src/pages/BookDetailsPage.tsx">
        <div className="text-center py-12" data-id="83vxaka5s" data-path="src/pages/BookDetailsPage.tsx">
          <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" data-id="k2tz2fvnj" data-path="src/pages/BookDetailsPage.tsx" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2" data-id="rp9r1264m" data-path="src/pages/BookDetailsPage.tsx">Livre non trouvé</h1>
          <p className="text-gray-600 mb-4" data-id="gk8idvsx6" data-path="src/pages/BookDetailsPage.tsx">
            Le livre que vous recherchez n'existe pas ou a été supprimé.
          </p>
          <Link to="/" data-id="86zob057t" data-path="src/pages/BookDetailsPage.tsx">
            <Button data-id="v72kjffb1" data-path="src/pages/BookDetailsPage.tsx">
              <ArrowLeft className="h-4 w-4 mr-2" data-id="2jcsbtjmf" data-path="src/pages/BookDetailsPage.tsx" />
              Retour au catalogue
            </Button>
          </Link>
        </div>
      </Layout>);

  }

  return (
    <Layout data-id="3w4fzkyge" data-path="src/pages/BookDetailsPage.tsx">
      <div className="space-y-6" data-id="64y6e7c7l" data-path="src/pages/BookDetailsPage.tsx">
        {/* Navigation */}
        <div className="flex items-center justify-between" data-id="m9jarihnd" data-path="src/pages/BookDetailsPage.tsx">
          <Link to="/" data-id="0sc8rhb94" data-path="src/pages/BookDetailsPage.tsx">
            <Button variant="outline" className="flex items-center space-x-2" data-id="wk3xlouat" data-path="src/pages/BookDetailsPage.tsx">
              <ArrowLeft className="h-4 w-4" data-id="1m5edqu57" data-path="src/pages/BookDetailsPage.tsx" />
              <span data-id="lv7zsqgjw" data-path="src/pages/BookDetailsPage.tsx">Retour au catalogue</span>
            </Button>
          </Link>
          
          <div className="flex items-center space-x-2" data-id="hdn1p75g6" data-path="src/pages/BookDetailsPage.tsx">
            <Button onClick={handleEdit} className="flex items-center space-x-2" data-id="iybs99uw2" data-path="src/pages/BookDetailsPage.tsx">
              <Edit className="h-4 w-4" data-id="5kmyg5qb5" data-path="src/pages/BookDetailsPage.tsx" />
              <span data-id="s5bthqze5" data-path="src/pages/BookDetailsPage.tsx">Modifier</span>
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              className="flex items-center space-x-2" data-id="8bi0r5zom" data-path="src/pages/BookDetailsPage.tsx">

              <Trash2 className="h-4 w-4" data-id="xf26ddl1h" data-path="src/pages/BookDetailsPage.tsx" />
              <span data-id="i764qzoi8" data-path="src/pages/BookDetailsPage.tsx">Supprimer</span>
            </Button>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" data-id="llg3lwgw6" data-path="src/pages/BookDetailsPage.tsx">
          {/* Informations principales */}
          <div className="lg:col-span-2" data-id="0h4g1up8c" data-path="src/pages/BookDetailsPage.tsx">
            <Card className="bg-white/90 backdrop-blur-sm border border-blue-200" data-id="1vntmdl2n" data-path="src/pages/BookDetailsPage.tsx">
              <CardHeader data-id="t1njm22un" data-path="src/pages/BookDetailsPage.tsx">
                <div className="flex justify-between items-start" data-id="mxd54v97o" data-path="src/pages/BookDetailsPage.tsx">
                  <div data-id="aghyrqjyx" data-path="src/pages/BookDetailsPage.tsx">
                    <CardTitle className="text-3xl font-bold text-gray-800 mb-2" data-id="eoloknu4q" data-path="src/pages/BookDetailsPage.tsx">
                      {book.title}
                    </CardTitle>
                    <p className="text-xl text-gray-600" data-id="zt44yf9og" data-path="src/pages/BookDetailsPage.tsx">{book.author}</p>
                  </div>
                  <Badge variant={book.available ? 'default' : 'destructive'} className="text-sm" data-id="r8gm7j1cb" data-path="src/pages/BookDetailsPage.tsx">
                    {book.available ? 'Disponible' : 'Emprunté'}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6" data-id="g811cn317" data-path="src/pages/BookDetailsPage.tsx">
                {book.description &&
                <div data-id="j7l1r5zlp" data-path="src/pages/BookDetailsPage.tsx">
                    <h3 className="text-lg font-semibold mb-2 flex items-center" data-id="92lgc9rl5" data-path="src/pages/BookDetailsPage.tsx">
                      <FileText className="h-5 w-5 mr-2 text-blue-600" data-id="163g2z9f7" data-path="src/pages/BookDetailsPage.tsx" />
                      Description
                    </h3>
                    <p className="text-gray-700 leading-relaxed" data-id="r1e2jfijb" data-path="src/pages/BookDetailsPage.tsx">{book.description}</p>
                  </div>
                }

                {book.coverImage &&
                <div data-id="3dv73jhb0" data-path="src/pages/BookDetailsPage.tsx">
                    <h3 className="text-lg font-semibold mb-2" data-id="vi1mpkgnb" data-path="src/pages/BookDetailsPage.tsx">Couverture</h3>
                    <img
                    src={book.coverImage}
                    alt={`Couverture de ${book.title}`}
                    className="max-w-sm rounded-lg shadow-md"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }} data-id="9inv0yk1d" data-path="src/pages/BookDetailsPage.tsx" />

                  </div>
                }
              </CardContent>
            </Card>
          </div>

          {/* Informations détaillées */}
          <div className="space-y-6" data-id="2vdf8vne9" data-path="src/pages/BookDetailsPage.tsx">
            <Card className="bg-white/90 backdrop-blur-sm border border-blue-200" data-id="bsaxmbhxp" data-path="src/pages/BookDetailsPage.tsx">
              <CardHeader data-id="ih92kkn6w" data-path="src/pages/BookDetailsPage.tsx">
                <CardTitle className="text-lg font-semibold" data-id="pq7xynzae" data-path="src/pages/BookDetailsPage.tsx">Détails du livre</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4" data-id="ne73kue0e" data-path="src/pages/BookDetailsPage.tsx">
                <div className="flex items-center space-x-3" data-id="kklontn23" data-path="src/pages/BookDetailsPage.tsx">
                  <User className="h-5 w-5 text-blue-600" data-id="ung6bugmb" data-path="src/pages/BookDetailsPage.tsx" />
                  <div data-id="gxr2xkqdl" data-path="src/pages/BookDetailsPage.tsx">
                    <p className="text-sm text-gray-500" data-id="7ork2o0f6" data-path="src/pages/BookDetailsPage.tsx">Auteur</p>
                    <p className="font-medium" data-id="r8c6i0nps" data-path="src/pages/BookDetailsPage.tsx">{book.author}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3" data-id="1et8o642o" data-path="src/pages/BookDetailsPage.tsx">
                  <Hash className="h-5 w-5 text-blue-600" data-id="jpcfbqgoe" data-path="src/pages/BookDetailsPage.tsx" />
                  <div data-id="hqd5pl76c" data-path="src/pages/BookDetailsPage.tsx">
                    <p className="text-sm text-gray-500" data-id="dm7q9x0w8" data-path="src/pages/BookDetailsPage.tsx">ISBN</p>
                    <p className="font-mono text-sm" data-id="rgvmg0gn4" data-path="src/pages/BookDetailsPage.tsx">{book.isbn}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3" data-id="dyrbg3yc8" data-path="src/pages/BookDetailsPage.tsx">
                  <Building className="h-5 w-5 text-blue-600" data-id="gjhg04rsh" data-path="src/pages/BookDetailsPage.tsx" />
                  <div data-id="gxj5nn7lo" data-path="src/pages/BookDetailsPage.tsx">
                    <p className="text-sm text-gray-500" data-id="jteaw6mm4" data-path="src/pages/BookDetailsPage.tsx">Éditeur</p>
                    <p className="font-medium" data-id="wctqh1zcd" data-path="src/pages/BookDetailsPage.tsx">{book.publisher}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3" data-id="6yfgbx382" data-path="src/pages/BookDetailsPage.tsx">
                  <Calendar className="h-5 w-5 text-blue-600" data-id="tb17kt7ug" data-path="src/pages/BookDetailsPage.tsx" />
                  <div data-id="s5208srkm" data-path="src/pages/BookDetailsPage.tsx">
                    <p className="text-sm text-gray-500" data-id="952oac543" data-path="src/pages/BookDetailsPage.tsx">Année de publication</p>
                    <p className="font-medium" data-id="qzjze4suy" data-path="src/pages/BookDetailsPage.tsx">{book.publicationYear}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3" data-id="sdcikqnbj" data-path="src/pages/BookDetailsPage.tsx">
                  <BookOpen className="h-5 w-5 text-blue-600" data-id="sbo7fltpr" data-path="src/pages/BookDetailsPage.tsx" />
                  <div data-id="gwmcxlfks" data-path="src/pages/BookDetailsPage.tsx">
                    <p className="text-sm text-gray-500" data-id="v23482y2i" data-path="src/pages/BookDetailsPage.tsx">Nombre de pages</p>
                    <p className="font-medium" data-id="l8rrj0u71" data-path="src/pages/BookDetailsPage.tsx">{book.pages} pages</p>
                  </div>
                </div>

                <div className="pt-2" data-id="liph6dar6" data-path="src/pages/BookDetailsPage.tsx">
                  <p className="text-sm text-gray-500 mb-1" data-id="l4kcnptj2" data-path="src/pages/BookDetailsPage.tsx">Genre</p>
                  <Badge variant="outline" data-id="pt7keasne" data-path="src/pages/BookDetailsPage.tsx">{book.genre}</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Informations système */}
            <Card className="bg-white/90 backdrop-blur-sm border border-blue-200" data-id="grtpanvaw" data-path="src/pages/BookDetailsPage.tsx">
              <CardHeader data-id="3ae7mntfb" data-path="src/pages/BookDetailsPage.tsx">
                <CardTitle className="text-lg font-semibold" data-id="uwvi2g0ie" data-path="src/pages/BookDetailsPage.tsx">Informations système</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm" data-id="eqcf5cwyu" data-path="src/pages/BookDetailsPage.tsx">
                <div data-id="wjms2p2u9" data-path="src/pages/BookDetailsPage.tsx">
                  <span className="text-gray-500" data-id="7k3ma61b2" data-path="src/pages/BookDetailsPage.tsx">ID: </span>
                  <span className="font-mono" data-id="dc2wgg1yo" data-path="src/pages/BookDetailsPage.tsx">{book.ID}</span>
                </div>
                {book.createdAt &&
                <div data-id="km98z1edd" data-path="src/pages/BookDetailsPage.tsx">
                    <span className="text-gray-500" data-id="sefapmt76" data-path="src/pages/BookDetailsPage.tsx">Créé le: </span>
                    <span data-id="sztjaqziq" data-path="src/pages/BookDetailsPage.tsx">{new Date(book.createdAt).toLocaleDateString('fr-FR')}</span>
                  </div>
                }
                {book.updatedAt &&
                <div data-id="qpkb39y67" data-path="src/pages/BookDetailsPage.tsx">
                    <span className="text-gray-500" data-id="f6njvn0hb" data-path="src/pages/BookDetailsPage.tsx">Modifié le: </span>
                    <span data-id="0uuluuw2w" data-path="src/pages/BookDetailsPage.tsx">{new Date(book.updatedAt).toLocaleDateString('fr-FR')}</span>
                  </div>
                }
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Formulaire de modification */}
      <Dialog open={isEditFormOpen} onOpenChange={setIsEditFormOpen} data-id="i9ca1e4ht" data-path="src/pages/BookDetailsPage.tsx">
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" data-id="9e99ztc7g" data-path="src/pages/BookDetailsPage.tsx">
          <DialogHeader data-id="1wr69fy1w" data-path="src/pages/BookDetailsPage.tsx">
            <DialogTitle data-id="ytz7x4mrg" data-path="src/pages/BookDetailsPage.tsx">Modifier le livre</DialogTitle>
          </DialogHeader>
          <BookForm
            book={book}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isSubmitting={isUpdating} data-id="vayjc50kk" data-path="src/pages/BookDetailsPage.tsx" />

        </DialogContent>
      </Dialog>
    </Layout>);

};

export default BookDetailsPage;