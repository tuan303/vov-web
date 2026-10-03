import { CONTENT_UPDATED, LANGS, SITE, content, pageUrl, type Lang } from './content';

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Dữ liệu có cấu trúc schema.org – chỉ khai báo thông tin đang hiển thị trên trang */
function structuredData(lang: Lang) {
  const t = content[lang];
  const org = `${SITE.origin}/#organization`;
  const address = { '@type': 'PostalAddress', ...SITE.schemaAddress };
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': org,
        name: SITE.legalName,
        alternateName: ['VOVSmart', 'VOV Smart', 'VOV SMART TECHNOLOGY JSC'],
        url: `${SITE.origin}/`,
        logo: SITE.images.logo,
        email: SITE.email,
        telephone: SITE.phoneSchema,
        taxID: SITE.taxId,
        address,
        knowsAbout: [
          'Industrial automation', 'Process control system integration', 'Smart building',
          'Home building automation', 'Smart factory', 'Digitalization', 'SCADA', 'DCS', 'PLC', 'BMS',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE.origin}/#website`,
        url: `${SITE.origin}/`,
        name: SITE.brand,
        inLanguage: ['en', 'vi'],
        publisher: { '@id': org },
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${SITE.origin}/#service`,
        name: 'VOVSmart Automation and Digitalization Services',
        url: `${SITE.origin}/`,
        image: SITE.origin + SITE.images.og,
        telephone: SITE.phoneSchema,
        email: SITE.email,
        address,
        areaServed: { '@type': 'Country', name: 'Vietnam' },
        parentOrganization: { '@id': org },
        serviceType: [
          'Automation system integration', 'DCS and SIS engineering', 'Smart building and home building systems',
          'Smart factory digitalization', 'SCADA, BMS, PLC and OT-IT integration',
        ],
      },
      {
        '@type': 'WebPage',
        '@id': `${pageUrl(lang)}#webpage`,
        url: pageUrl(lang),
        name: t.meta.title,
        description: t.meta.description,
        inLanguage: lang,
        isPartOf: { '@id': `${SITE.origin}/#website` },
        about: { '@id': org },
        dateModified: CONTENT_UPDATED,
        primaryImageOfPage: { '@type': 'ImageObject', url: SITE.origin + SITE.images.og, width: 1200, height: 630 },
      },
    ],
  };
  // Không để chuỗi "</" trong JSON nhúng vào HTML
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

/** Toàn bộ thẻ trong <head> cho một ngôn ngữ */
export function buildHead(lang: Lang): string {
  const t = content[lang];
  const url = pageUrl(lang);
  const other: Lang = lang === 'en' ? 'vi' : 'en';
  const heroWebp = SITE.images.heroWidths.map((w) => `/images/hero-${w}.webp ${w}w`).join(', ');
  const lines = [
    `<title>${esc(t.meta.title)}</title>`,
    `<meta name="description" content="${esc(t.meta.description)}">`,
    `<link rel="canonical" href="${url}">`,
    ...LANGS.map((l) => `<link rel="alternate" hreflang="${l}" href="${pageUrl(l)}">`),
    `<link rel="alternate" hreflang="x-default" href="${pageUrl('en')}">`,
    `<meta name="robots" content="index, follow, max-image-preview:large">`,
    `<meta name="author" content="${esc(SITE.legalName)}">`,
    `<meta name="theme-color" content="${SITE.themeColor}">`,
    `<meta name="format-detection" content="telephone=no">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:site_name" content="${SITE.brand}">`,
    `<meta property="og:locale" content="${t.meta.ogLocale}">`,
    `<meta property="og:locale:alternate" content="${content[other].meta.ogLocale}">`,
    `<meta property="og:url" content="${url}">`,
    `<meta property="og:title" content="${esc(t.meta.title)}">`,
    `<meta property="og:description" content="${esc(t.meta.description)}">`,
    `<meta property="og:image" content="${SITE.origin}${SITE.images.og}">`,
    `<meta property="og:image:width" content="1200">`,
    `<meta property="og:image:height" content="630">`,
    `<meta property="og:image:alt" content="${esc(t.meta.ogImageAlt)}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${esc(t.meta.title)}">`,
    `<meta name="twitter:description" content="${esc(t.meta.description)}">`,
    `<meta name="twitter:image" content="${SITE.origin}${SITE.images.og}">`,
    `<link rel="icon" href="/favicon.ico" sizes="16x16 32x32 48x48">`,
    `<link rel="icon" type="image/png" sizes="96x96" href="/favicon-96.png">`,
    `<link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png">`,
    `<link rel="apple-touch-icon" href="/apple-touch-icon.png">`,
    `<link rel="preload" as="image" type="image/webp" imagesrcset="${heroWebp}" imagesizes="(min-width: 1825px) 1825px, 100vw" fetchpriority="high">`,
    `<script type="application/ld+json">${structuredData(lang)}</script>`,
  ];
  return lines.join('\n    ');
}
