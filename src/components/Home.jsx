import "./Home.css";
import { useRef, useEffect, memo } from "react";
import gsap from "gsap";

// Memoize component to prevent unnecessary re-renders
export const Home = memo(() => {
  const starRefs = useRef([]);
  const contentRef = useRef(null);

  // Only run animations if screen is desktop size
  const isDesktop = window.innerWidth >= 1024;
  const gridRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Optimize initial load animation
    requestAnimationFrame(() => {
      const tl = gsap.timeline();

      // Use will-change to optimize animations
      if (contentRef.current) {
        contentRef.current.style.willChange = "transform";
      }

      gsap.set([contentRef.current.children, starRefs.current, gridRef.current], {
        opacity: 0,
        y: 50,
      });

      tl.to(gridRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
      })
        .to(
          contentRef.current.children,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
          },
          "-=0.5"
        )
        .to(
          starRefs.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
          },
          "-=0.8"
        );

      // Cleanup will-change after animation
      return () => {
        if (contentRef.current) {
          contentRef.current.style.willChange = "auto";
        }
      };
    });
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      role="region"
      aria-label="Home section"
    >
      <div
        className="grid-section"
        ref={gridRef}
        aria-hidden="true"
      ></div>

      <div
        className="glow-star left"
        ref={(el) => (starRefs.current[0] = el)}
        aria-hidden="true"
      />
      <div
        className="glow-star right"
        ref={(el) => (starRefs.current[1] = el)}
        aria-hidden="true"
      />

      <div
        className="hero-content"
        ref={contentRef}
        role="main"
        style={{ willChange: "transform" }}
      >
        <h1
          tabIndex="0"
          style={{
            contentVisibility: "auto",
            containIntrinsicSize: "0 50px",
          }}
        >
          I design and build clean websites
        </h1>
        <p tabIndex="0">
          I craft smooth digital experiences that work across all devices.
        </p>
        <button
          className="hire-me button"
          onClick={() =>
            window.open("https://www.linkedin.com/in/morad-shebl/", "_blank")
          }
          aria-label="Visit my LinkedIn profile to hire me"
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              window.open("https://www.linkedin.com/in/morad-shebl/", "_blank");
            }
          }}
        >
          Hire me
        </button>
      </div>
    </section>
  );
});

export default Home;
