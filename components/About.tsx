
import React from 'react';

const About: React.FC = () => {
  return (
    <section className="py-24 px-6 bg-slate-50 dark:bg-slate-900/30" id="about">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div className="reveal">
          <h2 className="text-accent font-extrabold uppercase tracking-[0.2em] text-xs mb-4">About the Company</h2>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-primary dark:text-white leading-tight">
            Leading System Integration in Vietnam
          </h3>
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
            VOV Smart is a premier technology firm dedicated to bridging the gap between hardware and software. 
            We specialize in providing comprehensive system integration solutions that empower businesses to 
            achieve peak operational efficiency in the digital age.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-start gap-5 p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
              <div className="bg-primary text-white p-3 rounded-xl shadow-lg shadow-primary/20">
                <span className="material-symbols-outlined">location_on</span>
              </div>
              <div>
                <h4 className="font-bold text-lg dark:text-white mb-1">Headquarters</h4>
                <p className="text-slate-500 dark:text-slate-400">36 Nguyen Dong Chi, Tu Liem, Hanoi, Vietnam</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 md:gap-8 reveal" style={{ transitionDelay: '0.2s' }}>
          <div className="pt-12">
            <img 
              alt="Tech office" 
              className="rounded-3xl shadow-2xl w-full h-[300px] object-cover hover:scale-105 transition-transform duration-500" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfpdmxrM9Jz7KBvLrpVtmLmeUC6-a9AgdddjH5r68hg9EYvh7kPYmKGbr9gPZAzQyMwice0jvsWFmyh5tOIWfjHYT_nW1r8lAgGD4aAJQO2XsVm1cG4s43c6lvc-aKsLVq4-zblpMUUQl0qBhacgB8OsDWdep_-i2XIGP0vkeiwJU696eyDLNacpy4FWJ4qaLHC-BPzwIzRLNK7W2Yx0BkgyKqSu8DecKSjS0KxorvHc0t7K4pgGJuoI9LNWt-MyjLRzn2FpiH1B0K"
            />
          </div>
          <div>
            <img 
              alt="Engineers working" 
              className="rounded-3xl shadow-2xl w-full h-[300px] object-cover hover:scale-105 transition-transform duration-500" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAX1nY_9TBPhc4ZJPH6oVsK4BI2gfbmIn4mYIP0lVcT8aDlTKgtO5RHFSflKnOvlPKO_6jdfeWWEcjtSSaLWSozhkOqpQS7ixTrfVlZYxhKgDXiArb-3S56mmIoQMueIZPAXUtNC880i8klpetsPN6gSkYamTEJQrJmz_XaUa61MeY2132zt9Vig0scs_UBLf8NLmz0I3vQUjlXsCXAAYKlM-Q9HOeGnKFCdNgjkkVD9Qa4sxGc34kjDLCIZ_LrKz8LnPo5JklaQUyp"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
