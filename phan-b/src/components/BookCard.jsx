export default function BookCard({ book, isFavorite, onToggleFavorite }) {
  return (
    <article className="book-card">
      <h3>{book.title}</h3>
      <p>Tác giả: {book.author}</p>
      <span className="badge">{book.genre}</span>
      <p>Năm xuất bản: {book.year}</p>
      <div className="card-actions">
        <button
          type="button"
          className={`btn btn-fav${isFavorite ? " active" : ""}`}
          onClick={() => onToggleFavorite(book.id)}
        >
          {isFavorite ? "★ Đã thích" : "☆ Yêu thích"}
        </button>
      </div>
    </article>
  );
}
