import "./About.css";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import techsData from "../data/techs.json";

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
    <section className="about" id="about" ref={sectionRef}>
      <div className="about-container">
        <div className="about-header" ref={headerRef}>
          <h2>About Me</h2>
          <p className="subtitle">Creative Developer & Designer</p>
        </div>

        <div className="about-content">
          <div className="profile-card" ref={profileRef}>
            <div className="profile-image">
              <img src="src\assets\portrait.png" alt="Profile" />
            </div>
            <div className="profile-info">
              <h3>Morad Shebl</h3>
              <p className="role">Frontend Developer</p>
              <div className="stats">
                <div className="stat">
                  <span className="number">1+</span>
                  <span className="label">Years Experience</span>
                </div>
                <div className="stat">
                  <span className="number">10+</span>
                  <span className="label">Projects Done</span>
                </div>
              </div>
            </div>
          </div>

          <div className="about-description" ref={descriptionRef}>
            <p>
              I'm a passionate frontend developer with a keen eye for design. I
              transform creative ideas into seamless, interactive experiences
              using modern web technologies.
            </p>

            <div className="skills">
              <h4>Tech Stack</h4>
              <div className="skill-tags">
                {skills.map((skill) => (
                  <span className="skill-tag" key={skill}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <button
              className="button-reversed"
              onClick={() =>
                window.open(
                  "https://drive.google.com/file/d/16W7VM0KSeqxTGeJ9HJCG094fNHLxE1ls/view?usp=sharing",
                  "_blank"
                )
              }
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
