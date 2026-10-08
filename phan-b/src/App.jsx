import { useState } from "react";
import { books } from "./data/books.js";
import Header from "./components/Header.jsx";
import Section from "./components/Section.jsx";
import GenreFilter from "./components/GenreFilter.jsx";
import BookList from "./components/BookList.jsx";
import Footer from "./components/Footer.jsx";

// Danh sách thể loại tính một lần từ dữ liệu (Set loại bỏ trùng lặp)
const genres = [...new Set(books.map((b) => b.genre))];

export default function App() {
  // App giữ state; component con chỉ nhận dữ liệu và hàm qua props
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [activeGenre, setActiveGenre] = useState("Tất cả");

  function handleToggleFavorite(id) {
    setFavoriteIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  const visibleBooks =
    activeGenre === "Tất cả"
      ? books
      : books.filter((b) => b.genre === activeGenre);

  return (
    <>
      <Header title="Thư viện của lớp" favoriteCount={favoriteIds.length} />
      <main className="container">
        <Section title="Thể loại">
          <GenreFilter
            genres={genres}
            activeGenre={activeGenre}
            onSelect={setActiveGenre}
          />
        </Section>
        <Section title="Danh sách sách">
          <p className="status">
            Đang hiển thị {visibleBooks.length} / {books.length} cuốn
          </p>
          <BookList
            books={visibleBooks}
            favoriteIds={favoriteIds}
            onToggleFavorite={handleToggleFavorite}
          />
        </Section>
      </main>
      <Footer />
    </>
  );
}
