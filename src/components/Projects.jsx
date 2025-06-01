import "./Projects.css";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import projectsData from "../data/projects.json";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef(null);
  const projectsRef = useRef([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    }).to(
      modalRef.current,
      {
        opacity: 0,
        duration: 0.2,
        onComplete: () => {
          setIsModalOpen(false);
          setSelectedProject(null);
          document.body.style.overflow = "unset";
        },
      }
    );
  };

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

  return (
    <section className="projects-section" ref={sectionRef} id="projects">
      <div className="projects-container">
        <h2 className="projects-title">
          Featured <span className="accent">Projects</span>
          <span className="sparkle projects-sparkle">✨</span>
        </h2>

        <div className="projects-grid">
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-card"
              ref={(el) => (projectsRef.current[project.id - 1] = el)}
            >
              <div className="project-image">
                <img src={project.image} alt={project.title} />
                <div className="project-overlay">
                  <div className="tech-stack">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={`${project.title}-${tech}-${techIndex}`}
                        className="tech-tag"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <button
                className="button-reversed"
                onClick={() => handleLearnMore(project)}
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
          >
            <div
              className="project-modal"
              ref={modalContentRef}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="close-modal" onClick={closeModal}>
                &times;
              </button>

              <div className="modal-header">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="main-image"
                />
                <h2>{selectedProject.title}</h2>
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
                            src={screenshot}
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
    </section>
  );
};

export default Projects;
