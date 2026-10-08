// Validate form thêm sách: báo lỗi dưới từng ô, khi gõ và khi gửi

const validators = {
  title(value) {
    return value.trim().length >= 3 ? "" : "Tên sách phải có ít nhất 3 ký tự.";
  },
  author(value) {
    return value.trim() ? "" : "Tác giả là bắt buộc.";
  },
  genre(value) {
    return value ? "" : "Vui lòng chọn thể loại.";
  },
  year(value) {
    const max = new Date().getFullYear();
    const n = Number(value);
    if (value.trim() === "" || !Number.isInteger(n)) return "Năm xuất bản phải là số nguyên.";
    if (n < 1900 || n > max) return `Năm phải từ 1900 đến ${max}.`;
    return "";
  },
};

function showError(form, name, message) {
  const field = form.elements[name];
  form.querySelector(`[data-error-for="${name}"]`).textContent = message;
  field.classList.toggle("invalid", Boolean(message));
}

function validateField(form, name) {
  const message = validators[name](form.elements[name].value);
  showError(form, name, message);
  return message === "";
}

function validateAll(form) {
  // Không dùng every() để tất cả các ô đều được báo lỗi cùng lúc
  return Object.keys(validators).map((n) => validateField(form, n)).every(Boolean);
}

/**
 * @param {HTMLFormElement} form
 * @param {(book: {title, author, genre, year}) => Promise<void>} onValidSubmit
 */
export function initForm(form, onValidSubmit) {
  // Báo lỗi ngay khi gõ / đổi lựa chọn
  form.addEventListener("input", (e) => {
    if (e.target.name in validators) validateField(form, e.target.name);
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!validateAll(form)) return;

    const book = {
      title: form.elements.title.value.trim(),
      author: form.elements.author.value.trim(),
      genre: form.elements.genre.value,
      year: Number(form.elements.year.value),
    };
    await onValidSubmit(book);
    form.reset();
  });
}
