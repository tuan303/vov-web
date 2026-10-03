import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
  // Giữ 'class' để giao diện tối không tự bật theo cài đặt máy (giống trang cũ)
  darkMode: 'class',
  content: ['./index.html', './App.tsx', './content.ts', './icons.tsx', './components/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        primary: '#003B5C',
        accent: '#007BFF',
        'accent-ink': '#0062CC', // chữ nhỏ màu xanh: đủ tương phản trên nền trắng
        ink: '#002140', // nền phần đầu trang, trùng màu mép ảnh banner
      },
      fontFamily: {
        sans: ['"Inter Variable"', 'Inter', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [forms],
};
