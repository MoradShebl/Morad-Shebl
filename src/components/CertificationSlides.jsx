import { useEffect, useRef, useState } from "react";
import "./CertificationSlides.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import certData from "../data/certifications.json";

// Import certification images
import virtualPresentation from "../assets/Preparing a Great Virtual Presentation Course.png";
import deciLevel1 from "../assets/Morad Shebl Mohamed Eldeeb.png";
import numpy from "../assets/numpy.png";
import pythonBasics from "../assets/Course_Certificate_En.png";
import deciBootcamp from "../assets/Attending the DECI-IBM Bootcamp.jpg";
import deciSummer from "../assets/Summer camp of DECI.png";
import htmlCss from "../assets/Course_Certificate_En-1.png";
import digitalMarketing from "../assets/Certificate.png";
import programmingBasics from "../assets/أساسيات البرمجة بلغة جافا سكريبت و بايثون.jpg";

// Map for image imports
const imageMap = {
  "src/assets/Preparing a Great Virtual Presentation Course.png": virtualPresentation,
  "src/assets/Morad Shebl Mohamed Eldeeb.png": deciLevel1,
  "src/assets/numpy.png": numpy,
  "src/assets/Course_Certificate_En.png": pythonBasics,
  "src/assets/Attending the DECI-IBM Bootcamp.jpg": deciBootcamp,
  "src/assets/Summer camp of DECI.png": deciSummer,
  "src/assets/Course_Certificate_En-1.png": htmlCss,
  "src/assets/Certificate.png": digitalMarketing,
  "src/assets/أساسيات البرمجة بلغة جافا سكريبت و بايثون.jpg": programmingBasics
};

// Helper function to get the correct image source
const getImageSource = (imagePath) => {
  return imageMap[imagePath] || imagePath;
};

gsap.registerPlugin(ScrollTrigger);

const CertificationSlides = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sectionRef = useRef(null);
  const slideRefs = useRef([]);
  const { certifications } = certData;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % certifications.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + certifications.length) % certifications.length
    );
  };

  // Add keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(
        [".section-title", ".section-title .accent", ".section-title .sparkle"],
        {
          y: 50,
          opacity: 0,
        }
      );

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(
        [".section-title", ".section-title .accent", ".section-title .sparkle"],
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
        }
      ).from(
        ".cert-card",
        {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power0.out",
        },
        "-=0.5"
      );
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    gsap.to(slideRefs.current, {
      x: `${-currentSlide * 100}%`,
      duration: 0.8,
      ease: "power2.out",
    });
  }, [currentSlide]);

  return (
    <section
      className="certifications-section"
      ref={sectionRef}
      id="certifications"
      role="region"
      aria-label="Certifications carousel"
    >
      <h2 className="section-title" tabIndex="0">
        My <span className="accent">Certifications</span>
        <span className="sparkle" aria-hidden="true">✨</span>
      </h2>

      <div 
        className="slider-container"
        role="region"
        aria-roledescription="carousel"
        aria-label="Certification slides"
      >
        <div className="slides-wrapper">
          {certifications.map((cert, index) => (
            <div
              key={cert.id}
              className="slide"
              ref={(el) => (slideRefs.current[index] = el)}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${certifications.length}`}
              tabIndex={currentSlide === index ? 0 : -1}
            >
              <div className="cert-card">
                {cert.image && (
                  <img 
                    src={getImageSource(cert.image)} 
                    alt={`${cert.title} certificate from ${cert.issuer}`} 
                  />
                )}
                <div className="cert-info">
                  <h3 tabIndex="0">{cert.title}</h3>
                  <p tabIndex="0">
                    {cert.issuer} • {cert.date}
                  </p>
                  {cert.link && (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="button-reversed"
                      aria-label={`View credential for ${cert.title}`}
                    >
                      Show Credential
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <button 
          className="nav-button prev" 
          onClick={prevSlide}
          aria-label="Previous slide"
          onKeyDown={handleKeyDown}
        >
          <span aria-hidden="true">←</span>
        </button>
        <button 
          className="nav-button next" 
          onClick={nextSlide}
          aria-label="Next slide"
          onKeyDown={handleKeyDown}
        >
          <span aria-hidden="true">→</span>
        </button>

        <div className="dots" role="tablist" aria-label="Slide dots">
          {certifications.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentSlide ? "active" : ""}`}
              onClick={() => setCurrentSlide(index)}
              role="tab"
              aria-selected={index === currentSlide}
              aria-label={`Go to slide ${index + 1}`}
              tabIndex={index === currentSlide ? 0 : -1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationSlides;
