import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Plus, List, Search } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100" data-id="0ygnjdv8n" data-path="src/components/Layout.tsx">
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-200 sticky top-0 z-50" data-id="mr3hl9if5" data-path="src/components/Layout.tsx">
        <div className="container mx-auto px-4 py-4" data-id="904br7zae" data-path="src/components/Layout.tsx">
          <div className="flex justify-between items-center" data-id="661gx5ywj" data-path="src/components/Layout.tsx">
            <Link to="/" className="flex items-center space-x-2" data-id="ifvxek041" data-path="src/components/Layout.tsx">
              <BookOpen className="h-8 w-8 text-blue-600" data-id="8udwb7av0" data-path="src/components/Layout.tsx" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent" data-id="yfxp3uioj" data-path="src/components/Layout.tsx">
                Bibliothèque
              </h1>
            </Link>
            
            <nav className="flex items-center space-x-2" data-id="ulh7h65sr" data-path="src/components/Layout.tsx">
              <Link to="/" data-id="chm6ib5rc" data-path="src/components/Layout.tsx">
                <Button
                  variant={isActive('/') ? 'default' : 'ghost'}
                  className="flex items-center space-x-2" data-id="p5z64rwf6" data-path="src/components/Layout.tsx">

                  <List className="h-4 w-4" data-id="ozi3i071g" data-path="src/components/Layout.tsx" />
                  <span data-id="9od0nz5c4" data-path="src/components/Layout.tsx">Catalogue</span>
                </Button>
              </Link>
              
              <Link to="/books/new" data-id="hc7rjm6hf" data-path="src/components/Layout.tsx">
                <Button
                  variant={isActive('/books/new') ? 'default' : 'ghost'}
                  className="flex items-center space-x-2" data-id="us9krh0vk" data-path="src/components/Layout.tsx">

                  <Plus className="h-4 w-4" data-id="7zc6xiig0" data-path="src/components/Layout.tsx" />
                  <span data-id="sj5j1uo85" data-path="src/components/Layout.tsx">Nouveau Livre</span>
                </Button>
              </Link>
              
              <Link to="/search" data-id="rkvkcwqwn" data-path="src/components/Layout.tsx">
                <Button
                  variant={isActive('/search') ? 'default' : 'ghost'}
                  className="flex items-center space-x-2" data-id="erbqj85vr" data-path="src/components/Layout.tsx">

                  <Search className="h-4 w-4" data-id="csd5irngq" data-path="src/components/Layout.tsx" />
                  <span data-id="bhvgg61c3" data-path="src/components/Layout.tsx">Recherche</span>
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8" data-id="322ai95p3" data-path="src/components/Layout.tsx">
        {children}
      </main>

      <footer className="bg-white/50 backdrop-blur-sm border-t border-blue-200 mt-auto" data-id="8tpa38z4n" data-path="src/components/Layout.tsx">
        <div className="container mx-auto px-4 py-6 text-center text-gray-600" data-id="grh0l2gww" data-path="src/components/Layout.tsx">
          <p data-id="7nndf9gd3" data-path="src/components/Layout.tsx">© {new Date().getFullYear()} Système de Gestion de Bibliothèque. Tous droits réservés.</p>
        </div>
      </footer>
    </div>);

};

export default Layout;