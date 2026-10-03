// Kiểm tra kết quả build (thư mục dist): chạy sau "npm run build" (lệnh "npm test" tự build trước).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const read = (f) => readFileSync(path.join(dist, f), 'utf8');
const ORIGIN = 'https://www.vovsmart.net';
const pages = [
  { file: 'index.html', lang: 'en', url: `${ORIGIN}/`, h1: 'System integration for automation, smart buildings and smart factories' },
  { file: 'vi.html', lang: 'vi', url: `${ORIGIN}/vi`, h1: 'Tích hợp hệ thống tự động hóa, tòa nhà thông minh và nhà máy thông minh' },
];
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');

test('đã có thư mục dist', () => assert.ok(existsSync(path.join(dist, 'index.html')), 'hãy chạy npm run build'));

for (const p of pages) {
  test(`${p.file}: ngôn ngữ, canonical, hreflang`, () => {
    const html = read(p.file);
    assert.match(html, new RegExp(`<html lang="${p.lang}">`));
    assert.ok(html.includes(`<link rel="canonical" href="${p.url}">`));
    assert.ok(html.includes(`hreflang="en" href="${ORIGIN}/"`));
    assert.ok(html.includes(`hreflang="vi" href="${ORIGIN}/vi"`));
    assert.ok(html.includes(`hreflang="x-default" href="${ORIGIN}/"`));
    assert.ok(html.includes(`<meta property="og:url" content="${p.url}">`));
  });

  test(`${p.file}: tiêu đề & mô tả đúng độ dài`, () => {
    const html = read(p.file);
    const title = decode(html.match(/<title>(.*?)<\/title>/)[1]);
    const desc = decode(html.match(/<meta name="description" content="(.*?)">/)[1]);
    assert.ok(title.length >= 30 && title.length <= 60, `title ${title.length} ký tự`);
    assert.ok(desc.length >= 70 && desc.length <= 160, `description ${desc.length} ký tự`);
  });

  test(`${p.file}: nội dung có sẵn trong HTML (không cần JavaScript), H1 hiển thị`, () => {
    const html = read(p.file);
    const h1s = [...html.matchAll(/<h1([^>]*)>(.*?)<\/h1>/gs)];
    assert.equal(h1s.length, 1, 'đúng một thẻ H1');
    assert.equal(decode(h1s[0][2]), p.h1);
    assert.ok(!/sr-only/.test(h1s[0][1]), 'H1 không bị ẩn');
    assert.ok(html.includes('id="services"') && html.includes('id="projects"') && html.includes('id="contact"'));
    assert.ok(!html.includes('<div id="root"></div>'), 'không còn trang rỗng chờ JavaScript');
    assert.ok(!/class="[^"]*\breveal\b/.test(html), 'không còn hiệu ứng ẩn nội dung chờ cuộn');
  });

  test(`${p.file}: không còn phụ thuộc máy chủ ngoài làm chậm trang`, () => {
    const html = read(p.file);
    for (const bad of ['cdn.tailwindcss.com', 'fonts.googleapis.com', 'fonts.gstatic.com', 'esm.sh', 'hoangmaistarschool.edu.vn', 'vov-web-eight.vercel.app', 'material-symbols']) {
      assert.ok(!html.includes(bad), `còn tham chiếu tới ${bad}`);
    }
  });

  test(`${p.file}: dữ liệu có cấu trúc hợp lệ, dùng tên miền chính`, () => {
    const html = read(p.file);
    const data = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
    const types = data['@graph'].map((n) => n['@type']);
    assert.deepEqual(types, ['Organization', 'WebSite', 'ProfessionalService', 'WebPage']);
    const urls = JSON.stringify(data).match(/https?:\/\/[^"]+/g).filter((u) => !u.startsWith('https://schema.org'));
    assert.ok(urls.every((u) => u.startsWith(ORIGIN)), `URL lạ: ${urls.filter((u) => !u.startsWith(ORIGIN))}`);
    assert.equal(data['@graph'][3].inLanguage, p.lang);
  });

  test(`${p.file}: mọi file nội bộ được tham chiếu đều tồn tại`, () => {
    const html = read(p.file);
    const refs = new Set();
    for (const m of html.matchAll(/(?:src|href)="(\/[^"#?]*)"/g)) refs.add(m[1]);
    for (const m of html.matchAll(/(?:srcset|imagesrcset)="([^"]+)"/g)) {
      for (const part of m[1].split(',')) refs.add(part.trim().split(/\s+/)[0]);
    }
    const skip = new Set(['/', '/vi', '/api/sendInquiry']);
    const missing = [...refs].filter((r) => r.startsWith('/') && !skip.has(r) && !existsSync(path.join(dist, r)));
    assert.deepEqual(missing, []);
  });

  test(`${p.file}: ảnh có mô tả (alt), ô nhập có nhãn, biểu mẫu gửi được khi tắt JavaScript`, () => {
    const html = read(p.file);
    const imgs = [...html.matchAll(/<img\b[^>]*>/g)].map((m) => m[0]);
    assert.ok(imgs.length >= 9);
    for (const img of imgs) assert.match(img, /alt="[^"]+"/);
    const ids = [...html.matchAll(/<(?:input|textarea)[^>]*\bid="([^"]+)"/g)].map((m) => m[1]);
    for (const id of ids) assert.ok(html.includes(`for="${id}"`), `ô ${id} thiếu nhãn`);
    const form = html.match(/<form id="contact-form"[^>]*>/)[0];
    assert.ok(form.includes('method="post"') && form.includes('action="/api/sendInquiry"'), form);
    assert.ok(html.includes(`name="lang" value="${p.lang}"`));
    assert.ok(html.includes('id="contact-sent"') && html.includes('id="contact-failed"'));
  });
}

test('logo dùng link https://www.vovsmart.net/picture/VOVH.png (menu, chân trang, dữ liệu có cấu trúc)', () => {
  const LOGO = 'https://www.vovsmart.net/picture/VOVH.png';
  for (const p of pages) {
    const html = read(p.file);
    const logos = [...html.matchAll(/<img[^>]*alt="(?:VOV Smart logo|Logo VOV Smart)"[^>]*>/g)].map((m) => m[0]);
    assert.equal(logos.length, 2, `${p.file}: cần 2 logo (menu + chân trang)`);
    for (const img of logos) assert.ok(img.includes(`src="${LOGO}"`), img);
    const data = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
    assert.equal(data['@graph'][0].logo, LOGO);
    assert.ok(!html.includes('logo-vovsmart-'), 'không còn file logo cũ');
  }
});

test('robots.txt trỏ đúng sitemap', () => {
  assert.match(read('robots.txt'), /Sitemap: https:\/\/www\.vovsmart\.net\/sitemap\.xml/);
});

test('sitemap.xml có 2 trang và khai báo ngôn ngữ thay thế', () => {
  const xml = read('sitemap.xml');
  assert.ok(xml.includes(`<loc>${ORIGIN}/</loc>`) && xml.includes(`<loc>${ORIGIN}/vi</loc>`));
  assert.equal((xml.match(/hreflang="vi"/g) || []).length, 2);
  assert.ok(!xml.includes('vercel.app'));
});

test('llms.txt có thông tin liên hệ thật', () => {
  const txt = read('llms.txt');
  assert.ok(txt.includes('admin@vovsmart.net') && txt.includes('0111327434'));
});
