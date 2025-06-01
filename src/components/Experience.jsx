import './Experience.css';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import experienceData from '../data/experience.json';

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(".section-title", {
        y: 50,
        opacity: 0,
      });

      gsap.set(".timeline-item", {
        x: -50,
        opacity: 0,
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      timeline
        .to(".section-title", {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
        })
        .to(".timeline-item", {
          x: 0,
          opacity: 1,
          stagger: {
            each: 0.3,
          },
          duration: 0.5,
        })

      // Add hover animations
      document.querySelectorAll('.timeline-content').forEach(card => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out"
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          });
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section 
      className="experience-section" 
      ref={sectionRef} 
      id="experience"
      role="region"
      aria-label="Work experience timeline"
    >
      <div className="container">
        <h2 className="section-title" tabIndex="0">
          Experience <span className="accent">Journey</span>
          <span className="sparkle experience-sparkle" aria-hidden="true">✨</span>
        </h2>
        
        <div 
          className="timeline" 
          ref={timelineRef}
          role="list"
          aria-label="Experience timeline"
        >
          {experienceData.experiences.map((exp, index) => (
            <div 
              className="timeline-item" 
              key={exp.id}
              role="listitem"
              tabIndex="0"
              aria-label={`${exp.role} at ${exp.company}`}
            >
              <div 
                className="timeline-content"
                role="article"
              >
                <div className="time-period" tabIndex="0">{exp.period}</div>
                <div className="role-company">
                  <h3 tabIndex="0">{exp.role}</h3>
                  <span className="company" tabIndex="0">{exp.company}</span>
                </div>
                <p className="description" tabIndex="0">{exp.description}</p>
                <div 
                  className="skills"
                  role="list"
                  aria-label="Skills used"
                >
                  {exp.skills.map((skill, idx) => (
                    <span 
                      key={idx} 
                      className="skill-tag"
                      role="listitem"
                      tabIndex="0"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;