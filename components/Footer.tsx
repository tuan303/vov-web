import { SITE, type Dictionary, type Lang } from '../content';

export default function Footer({ lang, t }: { lang: Lang; t: Dictionary }) {
  return (
    <footer className="py-12 px-6 border-t border-slate-100 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <a href={SITE.paths[lang]} aria-label={t.nav.homeLabel}>
          <img
            src={SITE.images.logo}
            alt={t.nav.logoAlt}
            width={416}
            height={104}
            loading="lazy"
            decoding="async"
            className="h-[6.5rem] w-auto"
          />
        </a>

        <p className="text-center text-sm text-slate-600">{t.footer.rights}</p>

        <ul className="flex flex-wrap justify-center gap-6">
          {t.footer.tags.map((tag) => (
            <li key={tag} className="text-xs font-bold text-slate-500 uppercase tracking-widest">
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
