
import React from 'react';

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ darkMode, toggleDarkMode }) => {
  const navItems = [
    { label: 'Overview', href: '#overview' },
    { label: 'Services', href: '#services' },
    { label: 'Projects', href: '#projects' },
    { label: 'Management', href: '#management' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 glass-nav border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2" aria-label="VOV Smart home">
          <img
            src="https://hoangmaistarschool.edu.vn/thongtin/VOVH.png"
            alt="VOV Smart logo"
            className="h-14 sm:h-14 w-auto"
          />
        </a>

        <div className="flex items-center gap-3 sm:gap-6">
          <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600 dark:text-slate-300">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="hover:text-primary dark:hover:text-white transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          <a
            href="#contact"
            className="px-5 py-2.5 rounded-full bg-primary text-white font-bold text-sm hover:opacity-90 transition-opacity"
          >
            Contact Us
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
