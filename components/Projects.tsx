import { VENDORS, type Dictionary } from '../content';
import { Icon } from '../icons';

export default function Projects({ t }: { t: Dictionary }) {
  return (
    <section className="py-20 md:py-24 px-6 bg-white scroll-mt-24" id="projects" aria-labelledby="projects-title">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-4 mb-16">
          <div>
            <p className="text-accent-ink font-bold uppercase tracking-widest text-sm mb-4">{t.projects.eyebrow}</p>
            <h2 id="projects-title" className="text-3xl md:text-4xl font-black text-primary text-balance">
              {t.projects.title}
            </h2>
          </div>
          <p className="text-slate-600 max-w-md">{t.projects.intro}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-24">
          {t.projects.items.map((project) => (
            <article
              key={project.name}
              className="group p-8 bg-slate-50 rounded-3xl hover:bg-primary transition-colors duration-300"
            >
              <p className="inline-block px-3 py-1 rounded-full bg-blue-100 text-accent-ink text-xs font-bold uppercase mb-4 group-hover:bg-white/20 group-hover:text-white">
                {project.category}
              </p>
              <h3 className="text-2xl font-bold text-primary mb-2 group-hover:text-white">{project.name}</h3>
              <p className="text-sm font-bold text-slate-500 group-hover:text-blue-200 mb-6">
                {t.projects.clientLabel}: {project.client}
              </p>
              <div className="flex items-start gap-3">
                <Icon name="assignment" className="w-6 h-6 shrink-0 text-accent group-hover:text-white" />
                <p className="text-slate-600 group-hover:text-blue-100 italic">{project.scope}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="border-t border-slate-100 pt-16">
          <p className="text-center text-slate-500 text-xs font-bold uppercase tracking-[0.3em] mb-12">
            {t.projects.vendorsTitle}
          </p>
          <ul className="flex flex-wrap justify-center items-center gap-x-12 gap-y-10 px-4">
            {VENDORS.map((v) => (
              <li key={v.name} className="group flex items-center justify-center">
                <img
                  src={v.url}
                  alt={`${v.name} logo`}
                  width={128}
                  height={40}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className={`${v.h} w-24 md:w-32 object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition duration-500`}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
