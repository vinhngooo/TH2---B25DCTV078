export default function GenreFilter({ genres, activeGenre, onSelect }) {
  const options = ["Tất cả", ...genres];

  return (
    <div className="genre-filter">
      {options.map((genre) => (
        <button
          key={genre}
          type="button"
          className={`btn${genre === activeGenre ? " btn-primary" : ""}`}
          onClick={() => onSelect(genre)}
        >
          {genre}
        </button>
      ))}
    </div>
  );
}
