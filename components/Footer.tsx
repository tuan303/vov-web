
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-12 px-6 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start">
          <img
            src="https://hoangmaistarschool.edu.vn/thongtin/VOVH.png"
            alt="VOV Smart logo"
            className="h-[6.5rem] w-auto"
          />
        </div>
        
        <div className="text-center text-sm text-slate-500">
          (c) 2026 VOV Smart Technology JSC. All Rights Reserved.
        </div>
        
        <div className="flex gap-6">
           <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Digitalization</span>
           <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Automation</span>
           <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Smart Factory</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
