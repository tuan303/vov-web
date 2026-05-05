
import React from 'react';

const members = [
  {
    name: 'Pham Tien Van',
    role: 'Chairman',
    bio: 'Senior automation professional with 20+ years of international experience in industrial automation and EPC projects.'
  },
  {
    name: 'Bui Tran Vuong',
    role: 'Director',
    bio: 'Responsible for corporate management, legal representation, and business operations.'
  },
  {
    name: 'Pham Do Duong',
    role: 'Engineering Manager',
    bio: 'Manages engineering execution, technical quality, and project delivery.'
  },
  {
    name: 'Nguyen Thi Mai Hanh',
    role: 'Sales Manager',
    bio: 'Leads sales strategy, customer engagement, and partner development.'
  }
];

const Team: React.FC = () => {
  const contactEmail = 'admin@vovsmart.net';

  return (
    <section
      className="py-24 px-6 bg-slate-50 dark:bg-slate-950 scroll-mt-24"
      id="management"
      spellCheck={false}
      data-gramm="false"
      data-gramm_editor="false"
      data-enable-grammarly="false"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 reveal">
          <h2 className="text-accent font-bold uppercase tracking-widest text-sm mb-4">Management Team</h2>
          <h3 className="text-4xl font-black text-primary dark:text-white">Experienced Leadership</h3>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {members.map((m, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800 reveal">
              <div className="w-20 h-20 bg-primary rounded-full mb-6 flex items-center justify-center text-white text-2xl font-bold">
                {m.name.charAt(0)}
              </div>
              <p className="text-accent font-bold text-xs uppercase mb-4 tracking-tighter">{m.role}</p>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 leading-relaxed">
                {m.bio}
              </p>
              <a href={`mailto:${contactEmail}`} className="text-xs font-bold text-primary dark:text-blue-300 hover:text-accent flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">mail</span>
                Contact
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
