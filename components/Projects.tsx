
import React from 'react';

const projects = [
  {
    category: 'Railway & Transportation',
    name: 'Hanoi Metro Line 3',
    client: 'MRB | Thales / Alstom JV',
    scope: 'Telecom systems, ICS, ATS/SCADA, Power & BMS SCADA'
  },
  {
    category: 'Smart Office',
    name: 'Bosch Smart Lockers & Facility Management',
    client: 'Bosch Global Software Company',
    scope: '6000 smart lockers, HVAC, smart meeting room, security'
  },
  {
    category: 'Industrial & Energy',
    name: 'VietsovPetro CCP Offshore Platforms',
    client: 'VietsovPetro',
    scope: 'DCS and SIS upgrade and replacement for process control systems'
  },
  {
    category: 'Manufacturing',
    name: 'Nestle Route 66 Factory Expansion',
    client: 'Nestle',
    scope: 'Electrical automation, smart factory installation and commissioning'
  }
];

const vendors = [
  { name: 'Yokogawa', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Yokogawa_logo.svg/1280px-Yokogawa_logo.svg.png' },
  { name: 'Siemens', url: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Siemens-logo.svg' },
  { name: 'Emerson', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/EmersonElectricLogo.png/1280px-EmersonElectricLogo.png' },
  { name: 'ABB', url: 'https://upload.wikimedia.org/wikipedia/commons/0/00/ABB_logo.svg' },
  { name: 'Bosch', url: 'https://upload.wikimedia.org/wikipedia/commons/1/16/Bosch-logo.svg' },
  { name: 'Thales', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Thales_Logo.svg/1280px-Thales_Logo.svg.png' }
];

const Projects: React.FC = () => {
  return (
    <section className="py-24 px-6 bg-white dark:bg-slate-900 scroll-mt-24" id="projects">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 reveal">
          <div>
            <h2 className="text-accent font-bold uppercase tracking-widest text-sm mb-4">Project References</h2>
            <h3 className="text-4xl font-black text-primary dark:text-white">Automation & Smart Factory Track Record</h3>
          </div>
          <p className="text-slate-500 max-w-md mt-4 md:mt-0">
            Our team experience covers Oil & Gas, Power, Chemicals, Manufacturing, smart building, home building, automation and digitalization projects.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8 mb-24">
          {projects.map((project, idx) => (
            <div key={idx} className="group p-8 bg-slate-50 dark:bg-slate-800 rounded-3xl hover:bg-primary transition-all duration-500 reveal">
              <span className="inline-block px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/50 text-accent text-[10px] font-bold uppercase mb-4 group-hover:bg-white/20 group-hover:text-white">
                {project.category}
              </span>
              <h4 className="text-2xl font-bold text-primary dark:text-white mb-2 group-hover:text-white">{project.name}</h4>
              <p className="text-sm font-bold text-slate-400 group-hover:text-blue-200 mb-6">Client: {project.client}</p>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-accent group-hover:text-white">assignment</span>
                <p className="text-slate-600 dark:text-slate-400 group-hover:text-blue-100 italic">{project.scope}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="reveal border-t border-slate-100 dark:border-slate-800 pt-16">
           <p className="text-center text-slate-400 text-xs font-bold uppercase tracking-[0.3em] mb-12">Trusted by global technology vendors</p>
           <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-10 px-4">
              {vendors.map((v, i) => (
                <div key={i} className="group flex items-center justify-center">
                  <img 
                    src={v.url} 
                    alt={`${v.name} logo`}
                    className={`h-6 md:h-8 lg:h-9 w-auto object-contain filter grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 dark:brightness-200 dark:group-hover:brightness-100 ${
                      v.name === 'Emerson'
                        ? 'h-7 md:h-9 lg:h-10'
                        : v.name === 'Thales'
                          ? 'h-5 md:h-7 lg:h-8'
                          : ''
                    }`}
                    onError={(e) => {
                      // Fallback logic if needed, currently using direct SVG links which are stable
                      console.error(`Failed to load vendor logo: ${v.name}`);
                    }}
                  />
                </div>
              ))}
           </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
