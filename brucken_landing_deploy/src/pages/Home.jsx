import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ValueProposition from "../components/ValueProposition";
import Services from "../components/Services";
import SoftwareFactory from "../components/SoftwareFactory";
import Representation from "../components/Representation";
import BrandsCarousel from "../components/BrandsCarousel";
import PodcastSection from "../components/PodcastSection";
import Gallery from "../components/Gallery";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      {/* Shell de landing en modo claro, aislado del estilo de Intranet */}
      <div className="landing-shell min-h-screen">
        <Navbar />
        <main>
          <Hero />
          <ValueProposition />
          <Services />
          <SoftwareFactory />
          <Representation />
          <BrandsCarousel />
          <PodcastSection />
          <Gallery />
          <ContactForm />
        </main>
        <Footer />
      </div>
    </>
  );
}
