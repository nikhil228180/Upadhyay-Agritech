import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Services from "../components/Services";
import WhyChooseUs from "../components/WhyChooseUs";
import PropertyGallery from "../components/PropertyGallery";
import Leadership from "../components/Leadership";
import Footer from "../components/Footer";
import FloatingWhatsapp from "../components/FloatingWhatsapp";
import Contact from "../components/Contact";


function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <WhyChooseUs />
      <PropertyGallery />
      <Leadership />
      <Contact />
      <Footer />
      <FloatingWhatsapp />
    </>
  );
}

export default Home;