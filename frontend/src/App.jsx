import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BookshelfPage from "./pages/BookshelfPage";
import ItemDetailPage from "./pages/ItemDetailPage";
import Layout from "./layouts/GlobalLayout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<BookshelfPage />} />
          <Route path="item/:id" element={<ItemDetailPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
