import type { Dictionary, IconKey } from '../content';
import { Icon } from '../icons';

const tiles: IconKey[] = ['factory', 'apartment', 'precision_manufacturing', 'router', 'security', 'monitoring'];

export default function Overview({ t }: { t: Dictionary }) {
  return (
    <section className="py-20 md:py-24 px-6 bg-white scroll-mt-24" id="overview" aria-labelledby="overview-title">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <p className="text-accent-ink font-bold uppercase tracking-wider text-sm mb-4">{t.overview.eyebrow}</p>
          <h2 id="overview-title" className="text-3xl md:text-4xl font-black text-primary mb-8 text-balance">
            {t.overview.title}
          </h2>
          {t.overview.paragraphs.map((p, i) => (
            <p key={i} className="text-lg text-slate-600 mb-6 leading-relaxed">
              {p}
            </p>
          ))}

          <dl className="grid sm:grid-cols-2 gap-6 mt-10">
            {t.overview.facts.map((item) => (
              <div key={item.label} className="border-l-4 border-accent pl-4">
                <dt className="text-xs uppercase font-bold text-slate-500">{item.label}</dt>
                <dd className="text-primary font-bold">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="grid grid-cols-3 gap-4" aria-hidden="true">
          {tiles.map((icon) => (
            <div
              key={icon}
              className="aspect-square bg-slate-100 rounded-2xl flex items-center justify-center p-4 group hover:bg-primary transition-colors"
            >
              <Icon name={icon} className="w-9 h-9 text-primary group-hover:text-white" />
            </div>
          ))}
          <div className="col-span-3 mt-4 p-8 bg-blue-50 rounded-3xl">
            <p className="italic text-slate-600 text-center">“{t.overview.quote}”</p>
          </div>
        </div>
      </div>
    </section>
  );
}
