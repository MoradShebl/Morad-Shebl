import "./Projects.css";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import projectsData from "../data/projects.json";

// Import project images
import newPortofolio from "../assets/NewPortofolio.png";
import remembrall from "../assets/Remembrall.png";
import carFare from "../assets/CarFare.png";
import expensesTracker from "../assets/ExpensesTracker.jpg";
import sheblMohamed from "../assets/SheblMohamed.png";
import portofolioWebsite from "../assets/PortofolioWebste.png";
import faceBlur from "../assets/FaceBlur.png";
import talk2View from "../assets/Talk2View.png";

// Import screenshots
import newPortofolioScreen1 from "../assets/NewPortofolioWebsiteScreen1.png";
import newPortofolioScreen2 from "../assets/NewPortofolioWebsiteScreen2.png";
import newPortofolioScreen3 from "../assets/NewPortofolioWebsiteScreen3.png";
import remembrallScreen1 from "../assets/RemembrallScreen1.png";
import remembrallScreen2 from "../assets/RemembrallScreen2.png";
import remembrallScreen3 from "../assets/RemembrallScreen3.png";

// Map for image imports
const imageMap = {
  "src/assets/NewPortofolio.png": newPortofolio,
  "src/assets/Remembrall.png": remembrall,
  "src/assets/CarFare.png": carFare,
  "src/assets/ExpensesTracker.jpg": expensesTracker,
  "src/assets/SheblMohamed.png": sheblMohamed,
  "src/assets/PortofolioWebste.png": portofolioWebsite,
  "src/assets/FaceBlur.png": faceBlur,
  "src/assets/Talk2View.png": talk2View,
  "src/assets/NewPortofolioWebsiteScreen1.png": newPortofolioScreen1,
  "src/assets/NewPortofolioWebsiteScreen2.png": newPortofolioScreen2,
  "src/assets/NewPortofolioWebsiteScreen3.png": newPortofolioScreen3,
  "src/assets/RemembrallScreen1.png": remembrallScreen1,
  "src/assets/RemembrallScreen2.png": remembrallScreen2,
  "src/assets/RemembrallScreen3.png": remembrallScreen3,
};

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef(null);
  const projectsRef = useRef([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectsSlice, setprojectsSlice] = useState(3);
  const modalRef = useRef(null);
  const modalContentRef = useRef(null);

  const { projects } = projectsData;

  const handleLearnMore = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";

    // Wait for next frame to ensure modal is mounted
    requestAnimationFrame(() => {
      gsap.fromTo(
        modalRef.current,
        {
          opacity: 0,
          visibility: "visible",
        },
        {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        }
      );

      gsap.fromTo(
        modalContentRef.current,
        {
          y: 30,
          opacity: 0,
          scale: 0.95,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.4,
          delay: 0.1,
          ease: "power3.out",
        }
      );
    });
  };

  const closeModal = () => {
    const tl = gsap.timeline();

    tl.to(modalContentRef.current, {
      y: 20,
      opacity: 0,
      scale: 0.95,
      duration: 0.3,
      ease: "power3.in",
    }).to(modalRef.current, {
      opacity: 0,
      duration: 0.2,
      onComplete: () => {
        setIsModalOpen(false);
        setSelectedProject(null);
        document.body.style.overflow = "unset";
      },
    });
  };

  // Add keyboard handler for modal
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      closeModal();
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      // Focus trap for modal
      modalContentRef.current?.focus();
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  useEffect(() => {
    projectsRef.current = [];

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      // Set initial states
      gsap.set(".projects-title", {
        y: 100,
        opacity: 0,
      });

      gsap.set(".project-card", {
        y: 100,
        opacity: 0,
        scale: 0.9,
      });

      // Animate title
      tl.to(".projects-title", {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
      }) // Stagger project cards
        .to(
          ".project-card",
          {
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: {
              each: 0.2,
              ease: "power2.out",
            },
            duration: 0.8,
          },
          "-=0.5"
        );

      // Hover animations for project cards
      projectsRef.current.forEach((card) => {
        const overlay = card.querySelector(".project-overlay");
        const techStack = card.querySelector(".tech-stack");

        card.addEventListener("mouseenter", () => {
          gsap.to(overlay, {
            opacity: 1,
            duration: 0.3,
          });
          gsap.to(techStack.children, {
            y: 0,
            opacity: 1,
            stagger: 0.05,
            duration: 0.3,
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(overlay, {
            opacity: 0,
            duration: 0.3,
          });
          gsap.to(techStack.children, {
            y: 20,
            opacity: 0,
            duration: 0.2,
          });
        });
      });
    });

    return () => ctx.revert();
  }, []);

  // Helper function to get the correct image source
  const getImageSource = (imagePath) => {
    return imageMap[imagePath] || imagePath;
  };

  return (
    <section
      className="projects-section"
      ref={sectionRef}
      id="projects"
      role="region"
      aria-label="Projects section"
    >
      <div className="projects-container">
        <h2 className="projects-title" tabIndex="0">
          Featured <span className="accent">Projects</span>
          <span className="sparkle projects-sparkle" aria-hidden="true">
            ✨
          </span>
        </h2>

        <div className="projects-grid" role="list" aria-label="Projects list">
          {projects.slice(0, projectsSlice).map((project) => (
            <div
              key={project.id}
              className="project-card"
              ref={(el) => (projectsRef.current[project.id - 1] = el)}
              role="listitem"
              tabIndex="0"
            >
              <div className="project-image">
                <img
                  src={getImageSource(project.image)}
                  alt={`${project.title} project preview`}
                />
                <div className="project-overlay" aria-hidden="true">
                  <div
                    className="tech-stack"
                    role="list"
                    aria-label="Technologies used"
                  >
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={`${project.title}-${tech}-${techIndex}`}
                        className="tech-tag"
                        role="listitem"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <h3 tabIndex="0">{project.title}</h3>
              <p tabIndex="0">{project.description}</p>
              <button
                className="button-reversed"
                onClick={() => handleLearnMore(project)}
                aria-label={`Learn more about ${project.title}`}
              >
                Learn More
              </button>
            </div>
          ))}
        </div>

        {isModalOpen && selectedProject && (
          <div
            className="project-modal-overlay"
            ref={modalRef}
            onClick={closeModal}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`modal-title-${selectedProject.id}`}
          >
            <div
              className="project-modal"
              ref={modalContentRef}
              onClick={(e) => e.stopPropagation()}
              tabIndex="-1"
            >
              <button
                className="close-modal"
                onClick={closeModal}
                aria-label="Close modal"
              >
                &times;
              </button>

              <div className="modal-header">
                <img
                  src={getImageSource(selectedProject.image)}
                  alt={`${selectedProject.title} project preview`}
                  className="main-image"
                />
                <h2 id={`modal-title-${selectedProject.id}`} tabIndex="0">
                  {selectedProject.title}
                </h2>
              </div>

              <div className="modal-content">
                <div className="tech-stack">
                  {selectedProject.tech.map((tech, index) => (
                    <span key={index} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="description-section">
                  <h3>Overview</h3>
                  <p>
                    {selectedProject.details?.fullDescription ||
                      selectedProject.description}
                  </p>
                </div>

                {selectedProject.details?.features && (
                  <div className="features-section">
                    <h3>Key Features</h3>
                    <ul>
                      {selectedProject.details.features.map(
                        (feature, index) => (
                          <li key={index}>{feature}</li>
                        )
                      )}
                    </ul>
                  </div>
                )}

                {selectedProject.details?.screenshots && (
                  <div className="screenshots-section">
                    <h3>Screenshots</h3>
                    <div className="screenshots-grid">
                      {selectedProject.details.screenshots.map(
                        (screenshot, index) => (
                          <img
                            key={index}
                            src={getImageSource(screenshot)}
                            alt={`${selectedProject.title} screenshot ${
                              index + 1
                            }`}
                          />
                        )
                      )}
                    </div>
                  </div>
                )}

                <div className="project-links">
                  {selectedProject.details?.liveDemo && (
                    <a
                      href={selectedProject.details.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="demo-link"
                      aria-label={`View live demo of ${selectedProject.title}`}
                    >
                      Live Demo
                    </a>
                  )}
                  {selectedProject.details?.github && (
                    <a
                      href={selectedProject.details.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="github-link"
                      aria-label={`View GitHub repository of ${selectedProject.title}`}
                    >
                      GitHub Repository
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {projectsSlice < projects.length && (
        <button
          className="button-reversed show-more"
          onClick={() => setprojectsSlice(projectsSlice + 3)}
        >
          Show more
        </button>
      )}
    </section>
  );
};

export default Projects;
