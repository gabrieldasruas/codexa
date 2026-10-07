import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Showcase from "@/components/Showcase";
import { About, Process, Contact, Footer } from "@/components/Sections";

// Um único elemento raiz (não um fragmento): o Next rola até o topo dele ao navegar entre páginas.
export default function Home() {
  return (
    <div>
      <Header />
      <main>
        <Hero />
        <Showcase />
        <About />
        <Process />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
