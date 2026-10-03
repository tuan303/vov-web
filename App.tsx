import { content, type Lang } from './content';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Overview from './components/Overview';
import MissionVision from './components/MissionVision';
import Services from './components/Services';
import Projects from './components/Projects';
import Team from './components/Team';
import Contact from './components/Contact';
import Footer from './components/Footer';

/** Toàn bộ trang – được dựng sẵn thành HTML tĩnh lúc build (không chạy React trên trình duyệt) */
export default function App({ lang }: { lang: Lang }) {
  const t = content[lang];
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:bg-white focus:text-primary focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg font-bold"
      >
        {t.skipLink}
      </a>
      <div className="flex flex-col min-h-screen">
        <Navbar lang={lang} t={t} />
        <Hero t={t} />
        <main id="main">
          <Overview t={t} />
          <MissionVision t={t} />
          <Services t={t} />
          <Projects t={t} />
          <Team t={t} />
          <Contact lang={lang} t={t} />
        </main>
        <Footer lang={lang} t={t} />
      </div>
    </>
  );
}
