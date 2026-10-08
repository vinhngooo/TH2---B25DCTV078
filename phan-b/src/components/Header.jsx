export default function Header({ title, favoriteCount }) {
  return (
    <header className="site-header">
      <h1>📚 {title}</h1>
      <p className="fav-counter">
        Yêu thích: <strong>{favoriteCount}</strong>
      </p>
    </header>
  );
}
