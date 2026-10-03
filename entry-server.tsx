// Chỉ chạy lúc build (Node.js): dựng sẵn HTML cho từng ngôn ngữ.
import { renderToStaticMarkup } from 'react-dom/server';
import App from './App';
import { buildHead } from './seo';
import { CONTENT_UPDATED, LANGS, SITE, pageUrl, type Lang } from './content';

export { CONTENT_UPDATED, LANGS, SITE, pageUrl };

export function render(lang: Lang) {
  return { html: renderToStaticMarkup(<App lang={lang} />), head: buildHead(lang) };
}
