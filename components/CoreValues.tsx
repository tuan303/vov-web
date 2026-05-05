
import React from 'react';

const values = [
  {
    icon: 'lightbulb',
    title: 'Innovation',
    desc: "Constantly pushing the boundaries of what's possible in automation."
  },
  {
    icon: 'verified_user',
    title: 'Integrity',
    desc: 'Building trust through transparent and honest partnerships.'
  },
  {
    icon: 'groups',
    title: 'Collaboration',
    desc: 'Combining our expertise with client vision for perfect results.'
  },
  {
    icon: 'bolt',
    title: 'Excellence',
    desc: 'Delivering world-class quality in every integration project.'
  }
];

const CoreValues: React.FC = () => {
  return (
    <section className="py-24 px-6 bg-slate-50 dark:bg-slate-900/50" id="values">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 reveal">
          <h2 className="text-accent font-extrabold uppercase tracking-[0.2em] text-xs mb-4">Foundation</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-primary dark:text-white">Our Core Values</h3>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, idx) => (
            <div 
              key={idx} 
              className="group p-10 rounded-3xl bg-white dark:bg-slate-800 hover:bg-primary hover:text-white transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-primary/20 text-center reveal"
              style={{ transitionDelay: `${idx * 0.1}s` }}
            >
              <div className="w-20 h-20 bg-blue-50 dark:bg-slate-700 group-hover:bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-8 transition-colors duration-500">
                <span className="material-symbols-outlined text-4xl text-primary dark:text-white group-hover:text-white">
                  {value.icon}
                </span>
              </div>
              <h4 className="text-xl font-bold mb-4 group-hover:text-white">{value.title}</h4>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed group-hover:text-blue-100 transition-colors">
                {value.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreValues;
