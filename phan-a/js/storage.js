const KEY = "library:favorites";

// Trả về Set các mã sách yêu thích (đọc từ localStorage dạng JSON)
export function loadFavorites() {
  try {
    const raw = localStorage.getItem(KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return new Set(Array.isArray(arr) ? arr.map(String) : []);
  } catch {
    return new Set();
  }
}

export function saveFavorites(favorites) {
  try {
    localStorage.setItem(KEY, JSON.stringify([...favorites]));
  } catch {
    // localStorage bị chặn hoặc đầy: bỏ qua, ứng dụng vẫn chạy
  }
}
