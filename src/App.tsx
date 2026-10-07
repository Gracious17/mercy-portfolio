import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Marquee } from '@/components/Marquee';
import { About } from '@/components/About';
import { Stats } from '@/components/Stats';
import { Services } from '@/components/Services';
import { Work } from '@/components/Work';
import { Process } from '@/components/Process';
import { Testimonials } from '@/components/Testimonials';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { BalloonsPopBackground } from '@/components/ui/balloons-pop-background';

function App() {
  return (
    <div className="relative min-h-screen bg-canvas text-fg">
      {/* Site-wide animated background; sections with a solid surface sit above it */}
      <BalloonsPopBackground className="z-0" opacity={0.5} />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Marquee />
        <About />
        <Stats />
        <Services />
        <Work />
        <Process />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
