import type { Dictionary } from '../content';
import { Icon } from '../icons';

export default function MissionVision({ t }: { t: Dictionary }) {
  return (
    <section className="py-20 md:py-24 px-6 bg-primary text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/10 skew-x-12 translate-x-1/2" aria-hidden="true"></div>

      <div className="max-w-7xl mx-auto relative z-10 grid md:grid-cols-2 gap-16">
        <div>
          <div className="flex items-center gap-4 mb-8">
            <Icon name="visibility" className="w-12 h-12 text-accent" />
            <h2 className="text-3xl md:text-4xl font-black italic uppercase">{t.mission.visionTitle}</h2>
          </div>
          <p className="text-xl leading-relaxed text-blue-100 font-light">{t.mission.vision}</p>
        </div>

        <div>
          <div className="flex items-center gap-4 mb-8">
            <Icon name="rocket_launch" className="w-12 h-12 text-accent" />
            <h2 className="text-3xl md:text-4xl font-black italic uppercase">{t.mission.missionTitle}</h2>
          </div>
          <ul className="space-y-6">
            {t.mission.missions.map((m) => (
              <li key={m} className="flex items-start gap-4">
                <span className="w-2 h-2 bg-accent rounded-full mt-3 flex-shrink-0" aria-hidden="true"></span>
                <span className="text-lg text-blue-100">{m}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
