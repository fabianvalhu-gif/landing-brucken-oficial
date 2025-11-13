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
import SplashScreen from "../components/SplashScreen";

export default function Home() {
  return (
    <>
      <SplashScreen />
      <div className="bg-black text-white min-h-screen">
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
