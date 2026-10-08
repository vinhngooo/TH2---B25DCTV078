import BookCard from "./BookCard.jsx";

export default function BookList({ books, favoriteIds, onToggleFavorite }) {
  if (books.length === 0) {
    return <p className="status">Không có cuốn sách nào.</p>;
  }

  return (
    <div className="book-grid">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          isFavorite={favoriteIds.includes(book.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}
