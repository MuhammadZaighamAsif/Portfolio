import { Suspense, lazy, useEffect } from "react";
import { useTheme } from "@/hooks/useTheme";
import { usePageMeta, HOME_META } from "@/hooks/usePageMeta";
import Navbar from "@/components/portfolio/Navbar";
import Hero from "@/components/portfolio/Hero";
import About from "@/components/portfolio/About";
import Skills from "@/components/portfolio/Skills";
import Projects from "@/components/portfolio/Projects";
import Experience from "@/components/portfolio/Experience";
import Education from "@/components/portfolio/Education";
import Certificates from "@/components/portfolio/Certificates";
import Contact from "@/components/portfolio/Contact";
import Footer from "@/components/portfolio/Footer";

// The toolkit section bundles ~50 brand logos, so it is code-split and fetched when the browser is idle.
const loadToolkit = () => import("@/components/portfolio/Toolkit");
const Toolkit = lazy(loadToolkit);

const Index = () => {
  const { theme, toggle } = useTheme();
  usePageMeta(HOME_META);

  useEffect(() => {
    const timer = window.setTimeout(() => void loadToolkit(), 1200);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div style={{ backgroundColor: "var(--bg-primary)", minHeight: "100vh" }}>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Navbar theme={theme} onToggle={toggle} />
      <main id="main-content" tabIndex={-1} style={{ outline: "none" }}>
        <Hero />
        <About />
        <Skills />
        <Suspense fallback={<section id="tools" className="section" style={{ minHeight: "100vh" }} aria-hidden="true" />}>
          <Toolkit />
        </Suspense>
        <Projects />
        <Experience />
        <Education />
        <Certificates />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
