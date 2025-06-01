import { useEffect, useRef, useState } from "react";
import "./CertificationSlides.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import certData from "../data/certifications.json";

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
    >
      <h2 className="section-title">
        My <span className="accent">Certifications</span>
        <span className="sparkle">✨</span>
      </h2>

      <div className="slider-container">
        <div className="slides-wrapper">
          {certifications.map((cert, index) => (
            <div
              key={cert.id}
              className="slide"
              ref={(el) => (slideRefs.current[index] = el)}
            >
              <div className="cert-card">
                {cert.image && <img src={cert.image} alt={cert.title} />}
                <div className="cert-info">
                  <h3>{cert.title}</h3>
                  <p>
                    {cert.issuer} • {cert.date}
                  </p>
                  {cert.link && (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="button-reversed"
                    >
                      Show Credential
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="nav-button prev" onClick={prevSlide}>
          ←
        </button>
        <button className="nav-button next" onClick={nextSlide}>
          →
        </button>

        <div className="dots">
          {certifications.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentSlide ? "active" : ""}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationSlides;
