
import React from 'react';

const Overview: React.FC = () => {
  const info = [
    { label: 'Tax Code', value: '0111327434' },
    { label: 'Address', value: '36 Nguyen Dong Chi, Tu Liem, Hanoi, Vietnam' },
    { label: 'Website', value: 'https://vovsmart.net' }
  ];

  return (
    <section className="py-24 px-6 bg-white dark:bg-slate-900 scroll-mt-24" id="overview">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="reveal">
            <h2 className="text-accent font-bold uppercase tracking-wider text-sm mb-4">Company Overview</h2>
            <h3 className="text-4xl font-black text-primary dark:text-white mb-8">Automation, Smart Building & Digitalization Excellence</h3>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
              VOV Smart Technology JSC is a Vietnam-based technology and engineering company specializing in industrial automation, process control system integration, smart buildings, home building systems, smart factories, and facility control systems.
            </p>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
              We deliver end-to-end engineering and integration services that connect <strong>Operational Technology (OT)</strong> with <strong>Information Technology (IT)</strong>, enabling safe, reliable, efficient operation and practical digitalization for industrial and commercial facilities.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6">
              {info.map((item, i) => (
                <div key={i} className="border-l-4 border-accent pl-4">
                  <p className="text-xs uppercase font-bold text-slate-400">{item.label}</p>
                  <p className="text-primary dark:text-white font-bold">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 reveal">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-square bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center p-4 group hover:bg-primary transition-all">
                <span className="material-symbols-outlined text-4xl text-primary dark:text-accent group-hover:text-white">
                  {['factory', 'apartment', 'precision_manufacturing', 'router', 'security', 'monitoring'][i-1]}
                </span>
              </div>
            ))}
            <div className="col-span-3 mt-4 p-8 bg-blue-50 dark:bg-slate-800/50 rounded-3xl">
               <p className="italic text-slate-600 dark:text-slate-300 text-center">
                 "Connecting OT and IT for a smarter future"
               </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Overview;
