// Bước cuối của "npm run build": tạo các trang HTML tĩnh hoàn chỉnh + sitemap.xml.
// - dist/index.html  → https://www.vovsmart.net/    (tiếng Anh)
// - dist/vi.html     → https://www.vovsmart.net/vi  (tiếng Việt)
import { readFile, writeFile, readdir, rm } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const ssrDir = path.join(root, '.ssr');

const fail = (msg) => {
  console.error(`\n[prerender] LỖI: ${msg}\n`);
  process.exit(1);
};

const { render, LANGS, SITE, CONTENT_UPDATED, pageUrl } = await import(
  pathToFileURL(path.join(ssrDir, 'entry-server.js')).href
);

let template = await readFile(path.join(dist, 'index.html'), 'utf8');
for (const marker of ['<!--app-head-->', '<!--app-html-->', '<html lang="en">']) {
  if (!template.includes(marker)) fail(`không thấy "${marker}" trong dist/index.html`);
}

// 1) Nhúng thẳng CSS vào HTML (bớt một lượt tải chặn hiển thị)
const cssLinks = [...template.matchAll(/<link rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/g)];
if (cssLinks.length !== 1) fail(`cần đúng 1 file CSS, thấy ${cssLinks.length}`);
const [cssTag, cssHref] = cssLinks[0];
const css = (await readFile(path.join(dist, cssHref), 'utf8')).trim();
template = template.replace(cssTag, () => `<style>${css}</style>`);
await rm(path.join(dist, cssHref));

// 2) Tải trước phông chữ cần cho từng ngôn ngữ
const assets = await readdir(path.join(dist, 'assets'));
const font = (subset) => {
  const f = assets.find((a) => a.startsWith(`inter-${subset}-wght-normal`) && a.endsWith('.woff2'));
  if (!f) fail(`không thấy phông ${subset}`);
  return `<link rel="preload" as="font" type="font/woff2" href="/assets/${f}" crossorigin>`;
};
const fontPreload = { en: [font('latin')], vi: [font('latin'), font('vietnamese')] };

// 3) Dựng từng trang
for (const lang of LANGS) {
  const { html, head } = render(lang);
  if (!html.includes('<h1')) fail(`trang ${lang} không có thẻ H1`);
  const page = template
    .replace('<html lang="en">', `<html lang="${lang}">`)
    .replace('<!--app-head-->', () => [head, ...fontPreload[lang]].join('\n    '))
    .replace('<!--app-html-->', () => html);
  const file = lang === 'en' ? 'index.html' : `${lang}.html`;
  await writeFile(path.join(dist, file), page);
  console.log(`[prerender] ${file.padEnd(11)} ${(Buffer.byteLength(page) / 1024).toFixed(1)} KB  → ${pageUrl(lang)}`);
}

// 4) sitemap.xml có khai báo bản ngôn ngữ thay thế
const alternates = LANGS.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${pageUrl(l)}"/>`)
  .concat(`    <xhtml:link rel="alternate" hreflang="x-default" href="${pageUrl('en')}"/>`)
  .join('\n');
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${LANGS.map(
  (l) => `  <url>
    <loc>${pageUrl(l)}</loc>
    <lastmod>${CONTENT_UPDATED}</lastmod>
${alternates}
  </url>`,
).join('\n')}
</urlset>
`;
await writeFile(path.join(dist, 'sitemap.xml'), sitemap);
console.log(`[prerender] sitemap.xml  ${LANGS.length} trang, cập nhật ${CONTENT_UPDATED} (${SITE.origin})`);

await rm(ssrDir, { recursive: true, force: true });
