import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ValueProposition from "../components/ValueProposition";
import Services from "../components/Services";
import SoftwareFactory from "../components/SoftwareFactory";
import Representation from "../components/Representation";
import BrandsCarousel from "../components/BrandsCarousel";
import PodcastSection from "../components/PodcastSection";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";
import AboutUs from "../components/AboutUs";
import MarketingConsulting from "../components/MarketingConsulting";

export default function Home() {
  return (
    <>
      {/* Shell de landing en modo claro, aislado del estilo de Intranet */}
      <div className="landing-shell min-h-screen">
        <Navbar />
        <main>
          <Hero />
          <AboutUs />
          <ValueProposition />
          <Services />
          <MarketingConsulting />
          <SoftwareFactory />
          <Representation />
          <BrandsCarousel />
          <PodcastSection />
          <ContactForm />
        </main>
        <Footer />
      </div>
    </>
  );
}
