import type { Dictionary } from '../content';
import { Icon } from '../icons';

export default function Services({ t }: { t: Dictionary }) {
  return (
    <section className="py-20 md:py-24 px-6 bg-slate-50 scroll-mt-24" id="services" aria-labelledby="services-title">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-accent-ink font-bold uppercase tracking-widest text-sm mb-4">{t.services.eyebrow}</p>
          <h2 id="services-title" className="text-3xl md:text-4xl font-black text-primary text-balance">
            {t.services.title}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {t.services.groups.map((service) => (
            <article
              key={service.title}
              className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 shrink-0 bg-blue-50 rounded-2xl flex items-center justify-center">
                  <Icon name={service.icon} className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-primary">{service.title}</h3>
              </div>
              <ul className="space-y-3">
                {service.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-slate-600">
                    <Icon name="arrow_forward" className="w-4 h-4 mt-1 shrink-0 text-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-16 p-8 bg-primary rounded-[2rem] text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-2">{t.services.complianceTitle}</h3>
              <p className="text-blue-200">{t.services.compliance}</p>
            </div>
            <ul className="flex flex-wrap gap-3 md:gap-4">
              {t.services.tags.map((tag) => (
                <li key={tag} className="px-4 py-2 bg-white/10 rounded-full text-xs font-bold whitespace-nowrap">
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
