import "./Home.css";
import { useRef, useEffect, memo } from "react";
import gsap from "gsap";

// Memoize component to prevent unnecessary re-renders
export const Home = memo(() => {
  const starRefs = useRef([]);
  const contentRef = useRef(null);
  const gridRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Mouse movement handler for stars and grid
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      // Calculate movement based on mouse position relative to center
      const moveX = (clientX - centerX) / 100;
      const moveY = (clientY - centerY) / 100;

      // Animate grid with subtle movement
      gsap.to(gridRef.current, {
        transform: `translate(-50%, -50%) translate(${moveX * 2}px, ${moveY * 2}px)`,
        duration: 1,
        ease: "power2.out",
      });

      // Animate stars with more pronounced movement
      starRefs.current.forEach((star, index) => {
        const direction = index === 0 ? 1 : -1; // Move stars in opposite directions
        gsap.to(star, {
          x: moveX * 5 * direction,
          y: moveY * 5 * direction,
          duration: 1,
          ease: "power2.out",
        });
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

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

    // Cleanup event listener
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (contentRef.current) {
        contentRef.current.style.willChange = "auto";
      }
    };
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
