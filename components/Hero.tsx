
import React from 'react';

const Hero: React.FC = () => {
  return (
    <header className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-slate-950">
      <div className="absolute inset-0 z-0">
        <img 
          alt="VOV Smart automation, smart building and smart factory system integration" 
          className="w-full h-full object-cover" 
          src="https://hoangmaistarschool.edu.vn/thongtin/bannervovsmart.png"
        />
      </div>
      
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto reveal">
        <div className="flex justify-center mb-8">
            <div className="bg-white p-2 md:p-3 rounded-lg shadow-2xl">
              <img
                src="https://hoangmaistarschool.edu.vn/thongtin/VOVH.png"
                alt="VOV Smart logo"
                className="h-16 md:h-20 w-auto"
              />
           </div>
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight text-white leading-[1.1]">
          VOV Smart System Integration
        </h1>
        <p className="text-xl md:text-2xl text-blue-200 font-light tracking-widest uppercase mb-8">
          Automation | Smart Building | Smart Factory | Digitalization
        </p>
        <div className="h-1 w-24 bg-accent mx-auto mb-8"></div>
        <h2 className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto font-medium">
          Industrial automation, home building systems, smartbuilding solutions, and OT-IT digitalization by VOV SMART TECHNOLOGY JOINT STOCK COMPANY.
        </h2>
        
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <a href="#services" className="px-8 py-4 bg-accent hover:bg-blue-600 text-white font-bold rounded-lg transition-all transform hover:-translate-y-1">
            Our Services
          </a>
          <a href="#projects" className="px-8 py-4 border border-white/30 hover:bg-white/10 text-white font-bold rounded-lg transition-all">
            Project References
          </a>
        </div>
      </div>
    </header>
  );
};

export default Hero;
