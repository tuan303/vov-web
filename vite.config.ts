import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // Trang chỉ có một file JS nhỏ, không cần đoạn mã nạp trước module
    modulePreload: { polyfill: false },
    // Không nhúng phông chữ vào CSS (để trình duyệt chỉ tải bộ chữ cần dùng)
    assetsInlineLimit: 0,
  },
});
