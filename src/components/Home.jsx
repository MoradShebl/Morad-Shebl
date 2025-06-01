import "./Home.css";
import { useRef, useEffect } from "react";
import gsap from "gsap";

export const Home = () => {
  const starRefs = useRef([]);
  const contentRef = useRef(null);

  // Only run animations if screen is desktop size
  const isDesktop = window.innerWidth >= 1024;
  const gridRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Initial load animation
    const tl = gsap.timeline();

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

    // Only add mouse movement handlers if on desktop
    if (isDesktop) {
      const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        const x = (clientX / innerWidth) * 2 - 1;
        const y = (clientY / innerHeight) * 2 - 1;

        gsap.to(starRefs.current, {
          x: (i) => x * ((i + 1) * 20),
          y: (i) => y * ((i + 1) * 20),
          duration: 1,
          ease: "power2.out",
        });

        gsap.to(gridRef.current, {
          x: x * 5,
          y: y * 5,
          duration: 1,
          ease: "power2.out",
          onUpdate: () => {
            if (gridRef.current) {
              gridRef.current.style.transform = `translate(-50%, -50%) translate(${gsap.getProperty(gridRef.current, "x") || 0}px, ${gsap.getProperty(gridRef.current, "y") || 0}px)`;
            }
          },
        });

        gsap.to(contentRef.current, {
          x: x * 10,
          y: y * 10,
          duration: 1,
          ease: "power2.out",
        });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  return (
    <section id="home" ref={sectionRef}>
      <div className="grid-section" ref={gridRef}></div>

      <div
        className="glow-star left"
        ref={(el) => (starRefs.current[0] = el)}
      />
      <div
        className="glow-star right"
        ref={(el) => (starRefs.current[1] = el)}
      />

      <div className="hero-content" ref={contentRef}>
        <h1>I design and build clean websites</h1>
        <p>I craft smooth digital experiences that work across all devices.</p>
        <button
          className="hire-me button"
          onClick={() =>
            window.open("https://www.linkedin.com/in/morad-shebl/", "_blank")
          }
        >
          Hire me
        </button>
      </div>
    </section>
  );
};

export default Home;
