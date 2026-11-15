import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Skills from "../components/sections/Skills";
import Projects from "../components/sections/Projects";
import Testimonials from "../components/sections/Testimonials";
import Experience from "../components/sections/Experience";
import Certificates from "../components/sections/Certificates";
import Resume from "../components/sections/Resume";
import BlogPreview from "../components/sections/BlogPreview";
import Contact from "../components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Testimonials />
      <Experience />
      <Certificates />
      <Resume />
      <BlogPreview />
      <Contact />
    </>
  );
}