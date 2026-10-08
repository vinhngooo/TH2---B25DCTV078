import { fetchBooks, createBook, deleteBook } from "./api.js";
import { loadFavorites, saveFavorites } from "./storage.js";
import {
  renderBooks,
  renderGenreOptions,
  setStatus,
  setFavoriteCount,
} from "./render.js";
import { initForm } from "./form.js";

const $ = (id) => document.getElementById(id);
const listEl = $("book-list");
const statusEl = $("status");
const searchEl = $("search-input");
const genreFilterEl = $("genre-select");
const genreFormEl = $("genre");
const favCountEl = $("fav-count");
const formEl = $("book-form");

const state = {
  books: [],
  favorites: loadFavorites(), // Set các mã sách
  keyword: "",
  genre: "",
};

function getGenres() {
  // Set loại bỏ trùng lặp; sắp xếp theo bảng chữ cái tiếng Việt
  return [...new Set(state.books.map((b) => b.genre))].sort((a, b) =>
    a.localeCompare(b, "vi")
  );
}

function getVisibleBooks() {
  const kw = state.keyword.trim().toLowerCase();
  return state.books.filter(
    (b) =>
      (!kw || b.title.toLowerCase().includes(kw)) &&
      (!state.genre || b.genre === state.genre)
  );
}

function refreshGenres() {
  const genres = getGenres();
  renderGenreOptions(genreFilterEl, genres, state.genre);
  renderGenreOptions(genreFormEl, genres, genreFormEl.value);
  state.genre = genreFilterEl.value; // đồng bộ nếu thể loại đang chọn không còn
}

function render() {
  const visible = getVisibleBooks();
  renderBooks(listEl, visible, state.favorites);
  setFavoriteCount(favCountEl, state.favorites.size);
  setStatus(
    statusEl,
    visible.length === 0 && state.books.length > 0
      ? "Không có cuốn sách nào phù hợp."
      : `Đang hiển thị ${visible.length} / ${state.books.length} cuốn`
  );
}

// ---- Sự kiện ----
searchEl.addEventListener("input", () => {
  state.keyword = searchEl.value;
  render();
});

genreFilterEl.addEventListener("change", () => {
  state.genre = genreFilterEl.value;
  render();
});

// Event delegation: một listener duy nhất trên container
listEl.addEventListener("click", async (e) => {
  const btn = e.target.closest("button[data-action]");
  if (!btn) return;
  const card = btn.closest(".book-card");
  const id = card.dataset.id;

  if (btn.dataset.action === "favorite") {
    if (state.favorites.has(id)) state.favorites.delete(id);
    else state.favorites.add(id);
    saveFavorites(state.favorites);
    render();
  }

  if (btn.dataset.action === "delete") {
    const book = state.books.find((b) => String(b.id) === id);
    if (!window.confirm(`Bạn có chắc muốn xóa "${book.title}"?`)) return;
    try {
      await deleteBook(id);
      state.books = state.books.filter((b) => String(b.id) !== id);
      if (state.favorites.delete(id)) saveFavorites(state.favorites);
      refreshGenres();
      render();
    } catch (err) {
      setStatus(statusEl, err.message, true);
    }
  }
});

initForm(formEl, async (data) => {
  try {
    const created = await createBook(data);
    state.books.unshift(created); // hiển thị ở đầu danh sách
    refreshGenres();
    render();
  } catch (err) {
    setStatus(statusEl, err.message, true);
    throw err; // giữ nguyên dữ liệu trong form khi gửi lỗi
  }
});

// ---- Khởi động ----
async function init() {
  setFavoriteCount(favCountEl, state.favorites.size);
  setStatus(statusEl, "Đang tải…");
  try {
    state.books = await fetchBooks();
    refreshGenres();
    render();
  } catch (err) {
    setStatus(statusEl, `Không tải được dữ liệu: ${err.message}`, true);
  }
}

init();
