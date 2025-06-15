import "./About.css";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import techsData from "../data/techs.json";
import portrait from "../assets/portrait.png";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const profileRef = useRef(null);
  const descriptionRef = useRef(null);

  const { techs: skills } = techsData;

  useEffect(() => {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    gsap.set(
      [
        headerRef.current,
        profileRef.current,
        descriptionRef.current,
        ".skill-tag",
      ],
      {
        opacity: 0,
        y: 50,
      }
    );

    timeline
      .to(headerRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
      })
      .to(
        profileRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
        },
        "-=0.4"
      )
      .to(
        descriptionRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
        },
        "-=0.4"
      )
      .to(
        ".skill-tag",
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.4,
        },
        "-=0.4"
      );

    return () => {
      timeline.kill();
    };
  }, []);

  return (
    <section
      className="about"
      id="about"
      ref={sectionRef}
      role="region"
      aria-label="About section"
    >
      <div className="about-container">
        <div className="about-header" ref={headerRef}>
          <h2 tabIndex="0">About Me</h2>
          <p className="subtitle" tabIndex="0">
            Creative Developer & Designer
          </p>
        </div>

        <div className="about-content">
          <div
            className="profile-card"
            ref={profileRef}
            role="article"
            aria-label="Profile information"
          >
            <div className="profile-image">
              <img
                src={portrait}
                alt="Morad Shebl - Frontend Developer Portrait"
              />
            </div>
            <div className="profile-info">
              <h3 tabIndex="0">Morad Shebl</h3>
              <p className="role" tabIndex="0">
                Frontend Developer
              </p>
              <div
                className="stats"
                role="list"
                aria-label="Experience statistics"
              >
                <div className="stat" role="listitem">
                  <span
                    className="number"
                    aria-label="Years of experience"
                  >
                    1+
                  </span>
                  <span className="label">Years Experience</span>
                </div>
                <div className="stat" role="listitem">
                  <span
                    className="number"
                    aria-label="Number of completed projects"
                  >
                    10+
                  </span>
                  <span className="label">Projects Done</span>
                </div>
              </div>
            </div>
          </div>

          <div
            className="about-description"
            ref={descriptionRef}
            role="contentinfo"
          >
            <p tabIndex="0">
              I'm a passionate frontend developer with a keen eye for design. I
              transform creative ideas into seamless, interactive experiences
              using modern web technologies.
            </p>

            <div
              className="skills"
              role="region"
              aria-label="Technical skills"
            >
              <h4 tabIndex="0">Tech Stack</h4>
              <div
                className="skill-tags"
                role="list"
                aria-label="List of technical skills"
              >
                {skills.map((skill) => (
                  <span
                    className="skill-tag"
                    key={skill}
                    role="listitem"
                    tabIndex="0"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <button
              className="button-reversed"
              onClick={() =>
                window.open(
                  "https://drive.google.com/file/d/15xx-2bZsBfQtn8hvBvy6zHe98Qn6D_cs/view?usp=drive_link",
                  "_blank"
                )
              }
              aria-label="Download my CV"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  window.open(
                    "https://drive.google.com/file/d/15xx-2bZsBfQtn8hvBvy6zHe98Qn6D_cs/view?usp=drive_link",
                    "_blank"
                  );
                }
              }}
            >
              Download CV
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
