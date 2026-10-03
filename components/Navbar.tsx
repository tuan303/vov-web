import { SITE, type Dictionary, type Lang } from '../content';
import { Icon } from '../icons';

export default function Navbar({ lang, t }: { lang: Lang; t: Dictionary }) {
  const other: Lang = lang === 'en' ? 'vi' : 'en';
  return (
    <nav aria-label={t.nav.label} className="fixed top-0 inset-x-0 z-50 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-3">
        <a href={SITE.paths[lang]} className="flex items-center shrink-0" aria-label={t.nav.homeLabel}>
          <img
            src={SITE.images.logo}
            alt={t.nav.logoAlt}
            width={224}
            height={56}
            decoding="async"
            className="h-12 sm:h-14 w-auto"
          />
        </a>

        <div className="flex items-center gap-2 sm:gap-6">
          <ul className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600">
            {t.nav.items.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="hover:text-primary transition-colors">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href={SITE.paths[other]}
            hrefLang={other}
            lang={other}
            title={t.nav.switchLabel}
            aria-label={t.nav.switchLabel}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full border border-slate-300 text-sm font-bold text-slate-700 hover:border-primary hover:text-primary transition-colors"
          >
            <Icon name="language" className="w-4 h-4" />
            {t.nav.switchShort}
          </a>

          <a
            href="#contact"
            className="px-4 sm:px-5 py-2.5 rounded-full bg-primary text-white font-bold text-sm hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            {t.nav.contact}
          </a>
        </div>
      </div>
    </nav>
  );
}
