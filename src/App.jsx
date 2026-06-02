import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Beats from "./components/Beats";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Beats />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
