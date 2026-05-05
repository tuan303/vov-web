
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
        <h1 className="sr-only">
          VOV Smart System Integration
        </h1>
        <p className="sr-only">
          Automation | Smart Building | Smart Factory | Digitalization
        </p>
        <h2 className="sr-only">
          Industrial automation, home building systems, smartbuilding solutions, and OT-IT digitalization by VOV SMART TECHNOLOGY JOINT STOCK COMPANY.
        </h2>
        <div className="h-72 md:h-96" aria-hidden="true"></div>
        
        <div className="flex flex-wrap justify-center gap-4">
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
