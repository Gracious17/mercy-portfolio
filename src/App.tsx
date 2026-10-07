import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Marquee } from '@/components/Marquee';
import { About } from '@/components/About';
import { Services } from '@/components/Services';
import { Stats } from '@/components/Stats';
import { Work } from '@/components/Work';
import { Process } from '@/components/Process';
import { Testimonials } from '@/components/Testimonials';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

function App() {
  return (
    <div className="relative min-h-screen bg-ink-950 text-slate-100">
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Services />
        <Stats />
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
