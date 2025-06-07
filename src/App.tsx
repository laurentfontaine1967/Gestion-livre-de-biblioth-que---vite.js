import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BooksPage from "./pages/BooksPage";
import BookDetailsPage from "./pages/BookDetailsPage";
import NewBookPage from "./pages/NewBookPage";
import SearchPage from "./pages/SearchPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () =>
<QueryClientProvider client={queryClient} data-id="cpqhe8csg" data-path="src/App.tsx">
    <TooltipProvider data-id="xtl93klq5" data-path="src/App.tsx">
      <Toaster data-id="55ygxi0as" data-path="src/App.tsx" />
      <BrowserRouter data-id="40nyf271q" data-path="src/App.tsx">
        <Routes data-id="mbec2vuqa" data-path="src/App.tsx">
          <Route path="/" element={<BooksPage data-id="yo3uczxxs" data-path="src/App.tsx" />} data-id="qw3ac18rc" data-path="src/App.tsx" />
          <Route path="/books/new" element={<NewBookPage data-id="ampb4cqpm" data-path="src/App.tsx" />} data-id="6f6nlvlig" data-path="src/App.tsx" />
          <Route path="/books/:id" element={<BookDetailsPage data-id="lt5k5na3n" data-path="src/App.tsx" />} data-id="k6ty7olpc" data-path="src/App.tsx" />
          <Route path="/search" element={<SearchPage data-id="x6r0qey8e" data-path="src/App.tsx" />} data-id="v3shl6k4b" data-path="src/App.tsx" />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound data-id="tc78ix2va" data-path="src/App.tsx" />} data-id="1064b9ld3" data-path="src/App.tsx" />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>;


export default App;