# Website VOVSmart – www.vovsmart.net

Website giới thiệu công ty VOV Smart Technology JSC, hai ngôn ngữ:

| Trang | Địa chỉ | File được tạo khi build |
|---|---|---|
| Tiếng Anh | https://www.vovsmart.net/ | `dist/index.html` |
| Tiếng Việt | https://www.vovsmart.net/vi | `dist/vi.html` |

Dự án nối với Vercel: mỗi lần đẩy code lên GitHub, Vercel tự build và cập nhật trang (khoảng 1–2 phút).

## Sửa nội dung

Toàn bộ chữ của cả hai ngôn ngữ nằm trong **`content.ts`** (mỗi đoạn có bản `en` và `vi`).
Thông tin công ty (email, điện thoại, địa chỉ, mã số thuế) nằm ở phần `SITE` đầu file.
Khi sửa nội dung đáng kể, đổi `CONTENT_UPDATED` sang ngày sửa để Google biết trang đã cập nhật.

## Cách website hoạt động

- Lúc build, mọi trang được **dựng sẵn thành HTML hoàn chỉnh**: Google và các công cụ tìm kiếm đọc được toàn bộ nội dung ngay, không phải chờ JavaScript.
- Trên trình duyệt chỉ có một file JavaScript dưới 1 KB (`client.ts`) để gửi biểu mẫu liên hệ. Nếu trình duyệt tắt JavaScript, biểu mẫu vẫn gửi được.
- Giao diện dùng Tailwind được biên dịch sẵn và nhúng thẳng vào trang; phông Inter và biểu tượng được lưu ngay trong dự án, không tải từ máy chủ ngoài.
- Ảnh nằm trong `public/images/`, mỗi ảnh có nhiều cỡ (WebP cho trình duyệt mới, JPEG/PNG cho trình duyệt cũ). Khi thay banner cần tạo lại đủ các cỡ với **đúng tên file cũ** (`hero-640/800/960/1280/1825`, `og-image.jpg`).
- **Logo** lấy từ `https://www.vovsmart.net/picture/VOVH.png` (máy chủ tài liệu document.vovsmart.net). Muốn đổi logo chỉ cần thay file `VOVH.png` trên máy chủ tài liệu, không phải sửa code. Link này khai báo một chỗ duy nhất trong `content.ts` (`SITE.images.logo`).

## Cấu trúc thư mục

| Đường dẫn | Nội dung |
|---|---|
| `content.ts` | Nội dung song ngữ + thông tin công ty |
| `App.tsx`, `components/` | Bố cục các phần của trang |
| `icons.tsx` | Biểu tượng nhúng dạng SVG |
| `seo.ts` | Thẻ tiêu đề, mô tả, khai báo ngôn ngữ, dữ liệu có cấu trúc cho Google |
| `scripts/prerender.mjs` | Bước dựng trang tĩnh và tạo `sitemap.xml` |
| `api/sendInquiry.ts` | Hàm gửi email liên hệ qua Microsoft 365 |
| `public/` | Ảnh, biểu tượng trang, `robots.txt`, `llms.txt` |
| `tests/` | Kiểm thử tự động |
| `vercel.json` | Cấu hình Vercel: chuyển hướng tên miền phụ, bộ nhớ đệm, đường dẫn tài liệu |

Các file `components/About.tsx`, `CoreValues.tsx`, `Expertise.tsx` và thư mục `functions/`, `firebase.json` là phần cũ, hiện **không dùng**.

## Biểu mẫu liên hệ – biến môi trường trên Vercel

Giữ nguyên như trước: `MS_GRAPH_TENANT_ID`, `MS_GRAPH_CLIENT_ID`, `MS_GRAPH_CLIENT_SECRET`, `MS_GRAPH_SENDER`, `CONTACT_RECIPIENT`.
Biểu mẫu có ô bẫy chống thư rác: thư do máy tự động gửi bị bỏ qua, không tốn lượt gửi email.

## Lệnh (chỉ cần khi chạy trên máy, cần Node.js 20 trở lên)

```bash
npm install        # cài thư viện
npm run build      # build vào thư mục dist
npm run preview    # xem thử tại http://localhost:3000
npm test           # build rồi chạy toàn bộ kiểm thử
```

## Sau khi đưa lên mạng (làm một lần)

1. Vào Google Search Console, thêm tên miền `vovsmart.net` (loại "Domain", xác minh bằng bản ghi TXT tại nhà cung cấp tên miền).
2. Gửi sơ đồ trang: `https://www.vovsmart.net/sitemap.xml`.
3. Dùng công cụ kiểm tra URL cho `https://www.vovsmart.net/` và `https://www.vovsmart.net/vi`, chọn yêu cầu lập chỉ mục.
