
import React from 'react';

const Expertise: React.FC = () => {
  return (
    <section className="py-24 px-6 overflow-hidden bg-white dark:bg-slate-950" id="expertise">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 reveal">
          <h2 className="text-accent font-extrabold uppercase tracking-[0.2em] text-xs mb-4">What We Do</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-primary dark:text-white">Our Specialized Expertise</h3>
        </div>
        
        <div className="space-y-32">
          {/* Smart Building */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative reveal">
              <div className="absolute -inset-4 bg-primary/10 rounded-[2.5rem] -z-10 transform -rotate-2"></div>
              <img 
                alt="Smart Building skyscraper" 
                className="rounded-[2rem] shadow-2xl relative z-10 w-full h-[400px] object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBagXoTg3-OUaruEsT5s8KHhV2AAeXNds6jB-PLN0trJ9Dlec7bkEpSpoit7Wi4KTFig2RnbKmeArD0osf8f18qZ78d-DiclSUN-FmEiBNJv8qXjbLb7PRQRmM3qbX9p0C0DDHVOBWx3FwFOgnRlMZM_JeTuC0UovB8GXg75z6xyoI8PAApwBDHRcQabMW2P71ZnRNlAZ_G_uZVRndoV-w9P6YHeN9nJHwftsNLAheln_tAzLpw2kPCdaVoRO-XZ4t7FUlb3_sGisQ1"
              />
            </div>
            <div className="reveal" style={{ transitionDelay: '0.2s' }}>
              <div className="flex items-center gap-5 mb-8">
                <span className="material-symbols-outlined text-5xl text-primary dark:text-accent">apartment</span>
                <h4 className="text-3xl lg:text-4xl font-bold text-primary dark:text-white">Smart Building</h4>
              </div>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
                We design and implement intelligent ecosystems for commercial and residential buildings, 
                focusing on energy efficiency, occupant comfort, and advanced security through modern automation.
              </p>
              <ul className="space-y-5">
                {['HVAC & Lighting Automation', 'Integrated Security & Access Control', 'Building Management Systems (BMS)'].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 group">
                    <span className="material-symbols-outlined text-green-500 font-bold bg-green-50 dark:bg-green-900/20 p-1.5 rounded-full">check</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-200 group-hover:translate-x-1 transition-transform">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Smart Factory */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="lg:order-2 relative reveal">
              <div className="absolute -inset-4 bg-accent/10 rounded-[2.5rem] -z-10 transform rotate-2"></div>
              <img 
                alt="Smart Factory automation" 
                className="rounded-[2rem] shadow-2xl relative z-10 w-full h-[400px] object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2g3U-jmb3YY4h97P-cG1x0P0udKebv7mpLmpsEPHOm6-yyG66BwGhRn7bSYKPu3w5guTC6SyuVljURPGrakJJ7aSL24hpgdsIsEhNL4Uimb7h9dAa-Clz6qHU0RbQmBolPTsnZIB0ho8OrX8VvPPcIiBes-Na-hjyeZKzysnoytfE2lw1ebMoyL0aIG-nyERUNsMxVqPYbc2fDfplzKYksp2GO5GEcdY6HGCQnAjDSrcZWJoek5V810nRlrYdBptUhZm8NsgU2k4W"
              />
            </div>
            <div className="lg:order-1 reveal" style={{ transitionDelay: '0.2s' }}>
              <div className="flex items-center gap-5 mb-8">
                <span className="material-symbols-outlined text-5xl text-primary dark:text-accent">precision_manufacturing</span>
                <h4 className="text-3xl lg:text-4xl font-bold text-primary dark:text-white">Smart Factory</h4>
              </div>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
                Empowering Industrial 4.0 transformation through seamless integration of IoT, robotics, 
                and data analytics to optimize production lines and minimize downtime significantly.
              </p>
              <ul className="space-y-5">
                {['Industrial IoT (IIoT) Implementation', 'Real-time Data Monitoring & Analytics', 'Predictive Maintenance Systems'].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 group">
                    <span className="material-symbols-outlined text-green-500 font-bold bg-green-50 dark:bg-green-900/20 p-1.5 rounded-full">check</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-200 group-hover:translate-x-1 transition-transform">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Expertise;
