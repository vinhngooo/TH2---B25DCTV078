// Tất cả nội dung động đều dùng createElement + textContent (không dùng innerHTML)

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

export function createBookCard(book, isFavorite) {
  const card = el("article", "book-card");
  card.dataset.id = book.id;

  card.append(
    el("h3", "", book.title),
    el("p", "", `Tác giả: ${book.author}`),
    el("span", "badge", book.genre),
    el("p", "", `Năm xuất bản: ${book.year}`)
  );

  const actions = el("div", "card-actions");

  const favBtn = el("button", `btn btn-fav${isFavorite ? " active" : ""}`,
    isFavorite ? "★ Đã thích" : "☆ Yêu thích");
  favBtn.type = "button";
  favBtn.dataset.action = "favorite";

  const delBtn = el("button", "btn btn-delete", "Xóa");
  delBtn.type = "button";
  delBtn.dataset.action = "delete";

  actions.append(favBtn, delBtn);
  card.append(actions);
  return card;
}

export function renderBooks(container, books, favorites) {
  container.replaceChildren(
    ...books.map((b) => createBookCard(b, favorites.has(String(b.id))))
  );
}

// Điền danh sách <option> cho một <select>, giữ lại option đầu tiên (placeholder)
export function renderGenreOptions(select, genres, selected = "") {
  const placeholder = select.options[0];
  select.replaceChildren(placeholder);
  for (const g of genres) {
    const opt = el("option", "", g);
    opt.value = g;
    select.append(opt);
  }
  select.value = genres.includes(selected) ? selected : "";
}

export function setStatus(statusEl, message, isError = false) {
  statusEl.textContent = message;
  statusEl.classList.toggle("error-text", isError);
}

export function setFavoriteCount(counterEl, count) {
  counterEl.textContent = String(count);
}
