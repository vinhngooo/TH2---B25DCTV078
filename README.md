# Bài thực hành 02 – Thư viện của lớp

Hai phiên bản của cùng một ứng dụng: xem danh sách sách, tìm kiếm, lọc theo thể loại, đánh dấu yêu thích.

```
phan-a/   JavaScript thuần (HTML + CSS + ES modules)
phan-b/   React + Vite
```

## Cách chạy

**Phần A** – dùng ES modules và `fetch` nên phải chạy qua máy chủ HTTP, không mở trực tiếp bằng `file://`:

```bash
cd phan-a
npx serve .            # hoặc: python3 -m http.server 8000
```

Mặc định dữ liệu đọc từ `books.json`. Để dùng mockapi.io, tạo tài nguyên `books` (id, title, author, genre, year; ít nhất 10 cuốn, 3 thể loại) rồi dán URL vào hằng `API_URL` trong `js/api.js`. Khi đó việc thêm và xóa sách sẽ gửi POST và DELETE.

**Phần B**:

```bash
cd phan-b
npm install
npm run dev
```

## Cấu trúc Phần A

| File | Vai trò |
| --- | --- |
| `js/api.js` | fetch, POST, DELETE |
| `js/storage.js` | đọc/ghi danh sách yêu thích (JSON + localStorage) |
| `js/render.js` | tạo thẻ sách bằng `createElement` + `textContent` |
| `js/form.js` | validate form thêm sách |
| `js/main.js` | state, tìm kiếm, lọc, event delegation |

## So sánh Phần A (DOM thuần) và Phần B (React)

**Cách cập nhật giao diện.** Ở Phần A, mỗi thay đổi dữ liệu phải gọi tay các hàm cập nhật: `renderBooks`, đếm yêu thích, dòng trạng thái. Nếu quên một nơi thì giao diện lệch với dữ liệu. Ở Phần B, ta chỉ đổi state bằng `setFavoriteIds` hay `setActiveGenre`, React tự vẽ lại phần giao diện phụ thuộc vào state đó.

**Tổ chức mã.** Phần A tách theo chức năng thành các module (api, storage, render, form). Phần B tách theo phần giao diện thành component (Header, BookList, BookCard...), mỗi component tự gói markup và logic của nó, dùng lại được và nhận dữ liệu qua props.

**Xử lý sự kiện.** Phần A dùng một listener trên container rồi `closest()` và `dataset` để biết nút nào được bấm (event delegation). Phần B gắn `onClick` thẳng vào nút và truyền hàm xuống qua props, không cần tra ngược phần tử.

**Dữ liệu chảy theo đâu.** Phần A có một đối tượng `state` dùng chung, mọi hàm đều đọc được. Phần B đi một chiều: App giữ state, truyền xuống bằng props, con báo ngược lên bằng hàm callback.

**Chi phí.** DOM thuần nhẹ, không cần công cụ build, nhưng mã càng dài càng khó giữ đồng bộ. React cần Vite, JSX và học thêm khái niệm, nhưng với giao diện nhiều trạng thái thì mã gọn và dễ đoán hơn.

**Phạm vi.** Phần B chưa gọi API, chưa có tìm kiếm, form thêm sách, xóa và localStorage; các phần này là bước mở rộng tiếp theo.
