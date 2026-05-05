
import React from 'react';

const services = [
  {
    title: 'Industrial Automation & Process Control',
    items: ['DCS, PLC, SCADA, SIS, ICSS', 'Process control platform engineering experience', 'Process instrumentation and control', 'Plant-wide monitoring, control, and safety systems', 'Simulator systems (OTS)'],
    icon: 'settings_input_component'
  },
  {
    title: 'Smart Factory Solutions',
    items: ['Manufacturing execution systems (MES)', 'Plant information management (PIMS)', 'Utilities and process automation', 'OT-IT integration, data platforms and digitalization'],
    icon: 'precision_manufacturing'
  },
  {
    title: 'Smart Building, Home Building & Facility Systems',
    items: ['Building Management Systems (BMS)', 'Home building automation and facility control', 'Facility Management (FMCS)', 'Electrical power monitoring (ECMS)', 'ELV: CCTV, Access Control, PA/VA, Fire Alarm'],
    icon: 'domain'
  },
  {
    title: 'Engineering & Project Management',
    items: ['Conceptual design, FEED, detailed engineering', 'Engineering calculations & specifications', 'Project management (PMP-oriented)', 'EPC/EPCM and PMC support'],
    icon: 'architecture'
  }
];

const Services: React.FC = () => {
  return (
    <section className="py-24 px-6 bg-slate-50 dark:bg-slate-950 scroll-mt-24" id="services">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 reveal">
          <h2 className="text-accent font-bold uppercase tracking-widest text-sm mb-4">Our Core Services</h2>
          <h3 className="text-4xl font-black text-primary dark:text-white">Professional Automation & Smartbuilding Solutions</h3>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-all reveal">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-3xl text-accent">{service.icon}</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-primary dark:text-white">{service.title}</h4>
                </div>
              </div>
              <ul className="space-y-3">
                {service.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-600 dark:text-slate-400">
                    <span className="material-symbols-outlined text-accent text-sm mt-1">arrow_forward</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 bg-primary rounded-[2rem] text-white reveal">
           <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                 <h4 className="text-2xl font-bold mb-2">Engineering Capability & Compliance</h4>
                 <p className="text-blue-200">Executing projects in compliance with TCVN, IEC, ISA, IEEE, API, NFPA, DIN, ISO.</p>
              </div>
              <div className="flex gap-4">
                 {['HAZOP', 'QA/QC', 'Cost Control'].map((tag) => (
                   <span key={tag} className="px-4 py-2 bg-white/10 rounded-full text-xs font-bold">{tag}</span>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
