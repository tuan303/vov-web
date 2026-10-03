import { SITE, type Dictionary } from '../content';
import { Icon } from '../icons';

export default function Team({ t }: { t: Dictionary }) {
  return (
    <section className="py-20 md:py-24 px-6 bg-slate-50 scroll-mt-24" id="management" aria-labelledby="management-title">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-accent-ink font-bold uppercase tracking-widest text-sm mb-4">{t.team.eyebrow}</p>
          <h2 id="management-title" className="text-3xl md:text-4xl font-black text-primary text-balance">
            {t.team.title}
          </h2>
        </div>

        <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {t.team.members.map((m) => (
            <li key={m.role} className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
              <div
                className="w-20 h-20 bg-primary rounded-full mb-6 flex items-center justify-center text-white text-2xl font-bold"
                aria-hidden="true"
              >
                {m.initial}
              </div>
              <h3 className="text-accent-ink font-bold text-xs uppercase mb-4 tracking-tight">{m.role}</h3>
              <p className="text-slate-600 text-sm mb-6 leading-relaxed">{m.bio}</p>
              <a
                href={`mailto:${SITE.email}`}
                className="text-xs font-bold text-primary hover:text-accent inline-flex items-center gap-2"
              >
                <Icon name="mail" className="w-4 h-4" />
                {t.team.contactLabel}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
