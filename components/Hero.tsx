import { SITE, type Dictionary } from '../content';
import Picture, { heroPicture } from './Picture';

export default function Hero({ t }: { t: Dictionary }) {
  return (
    <header className="pt-20 bg-ink text-white">
      <div className="max-w-[1825px] mx-auto">
        <Picture
          {...heroPicture}
          fallbackExt="jpg"
          alt={t.hero.imageAlt}
          width={SITE.images.heroWidth}
          height={SITE.images.heroHeight}
          className="block w-full h-auto"
          priority
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-10 pb-14 md:pt-12 md:pb-16 grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight text-balance">{t.hero.title}</h1>
          <p className="mt-5 text-lg md:text-xl leading-relaxed text-blue-100">{t.hero.lead}</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <a
            href="#services"
            className="px-7 py-4 bg-accent-ink hover:bg-[#0052AB] text-white font-bold rounded-lg transition-colors"
          >
            {t.hero.ctaServices}
          </a>
          <a
            href="#projects"
            className="px-7 py-4 border border-white/40 hover:bg-white/10 text-white font-bold rounded-lg transition-colors"
          >
            {t.hero.ctaProjects}
          </a>
        </div>
      </div>
    </header>
  );
}
