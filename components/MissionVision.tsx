
import React from 'react';

const MissionVision: React.FC = () => {
  return (
    <section className="py-24 px-6 bg-primary text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/10 skew-x-12 translate-x-1/2"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-16">
          <div className="reveal">
            <div className="flex items-center gap-4 mb-8">
              <span className="material-symbols-outlined text-5xl text-accent">visibility</span>
              <h3 className="text-4xl font-black italic uppercase">Vision</h3>
            </div>
            <p className="text-xl leading-relaxed text-blue-100 font-light">
              To become a <strong>trusted regional partner</strong> in automation, smart facilities, and digital transformation, delivering sustainable and standards-compliant engineering solutions for industrial and commercial customers.
            </p>
          </div>
          
          <div className="reveal" style={{ transitionDelay: '0.2s' }}>
            <div className="flex items-center gap-4 mb-8">
              <span className="material-symbols-outlined text-5xl text-accent">rocket_launch</span>
              <h3 className="text-4xl font-black italic uppercase">Mission</h3>
            </div>
            <ul className="space-y-6">
              {[
                'Provide reliable and practical automation and facility solutions based on international engineering standards',
                'Bridge plant engineering know-how with modern digital technologies',
                'Support clients throughout the full project lifecycle, from concept to operation'
              ].map((m, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="w-2 h-2 bg-accent rounded-full mt-3 flex-shrink-0"></span>
                  <span className="text-lg text-blue-100">{m}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
