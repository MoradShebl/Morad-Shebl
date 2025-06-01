import "./DesignProcess.css";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DesignProcess = () => {
  const processSteps = [
    {
      id: 1,
      title: "Understand and Plan",
      description:
        "In this step, the developer reviews the project goals, user requirements, and design files (like Figma or XD). The focus is on understanding the layout, components, and interactions. This helps plan the structure of the UI and ensures clarity before coding begins.",
      iconClass: "research",
    },
    {
      id: 2,
      title: "Build the Interface",
      description:
        "The developer sets up the project using React for component-based architecture and Tailwind CSS for styling. The interface is built by translating designs into reusable components, ensuring responsive layouts, accessibility, and smooth user interactions.",
      iconClass: "design",
    },
    {
      id: 3,
      title: "Test and Launch",
      description:
        "Once the interface is built, the developer tests it across devices and browsers, fixes bugs, and optimizes performance. After final refinements, the code is deployed to a live environment, and feedback is gathered for future improvements.",
      iconClass: "develop",
    },
  ];

  const stepRefs = useRef([]);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    gsap.set(titleRef.current, { y: 50, opacity: 0 });
    gsap.set(".process-step", { y: 100, opacity: 0 });
    gsap.set(".step-connector", { scaleY: 0 });

    tl.to(titleRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: "power3.out",
    })

      .to(
        ".process-step",
        {
          y: 0,
          opacity: 1,
          stagger: 0.3,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.5"
      )

      .to(
        ".step-connector",
        {
          scaleY: 1,
          duration: 0.6,
          stagger: 0.3,
          ease: "power1.inOut",
        },
        "-=0.6"
      );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section className="design-process" ref={sectionRef}>
      <div className="design-process-container">
        <div className="design-process-header">
          <h2 className="design-process-title" ref={titleRef}>
            My process to design
            <span className="sparkle">✨</span>
          </h2>
        </div>

        <div className="process-steps">
          {processSteps.map((step, index) => (
            <div key={step.id} className="process-step">
              <div className="step-number-container">
                <div className="step-number">{step.id}</div>
                {index < processSteps.length - 1 && (
                  <div className="step-connector"></div>
                )}
              </div>

              <div className="step-content">
                <div className="step-content-inner">
                  <div className={`step-icon ${step.iconClass}`}>
                    <svg
                      width="40"
                      height="39"
                      viewBox="0 0 54 56"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M53.8958 17.3507C51.432 11.3596 46.9672 6.40809 41.2619 3.33988C35.5567 0.271662 28.964 -0.723412 22.6074 0.524199C16.2507 1.77181 10.5233 5.18492 6.40098 10.182C2.27869 15.179 0.0165768 21.4508 9.0676e-05 27.9287C-0.0163955 34.4067 2.21376 40.6899 6.31057 45.7079C10.4074 50.7258 16.1174 54.168 22.4676 55.448C28.8178 56.7279 35.4154 55.7664 41.1362 52.7273C46.857 49.6882 51.347 44.7595 53.8413 38.7809L28 28L53.8958 17.3507Z"
                        fill="url(#paint0_linear_1_1570)"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_1_1570"
                          x1="55.7769"
                          y1="24.3575"
                          x2="0.201696"
                          y2="24.7785"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#7A87FB" />
                          <stop offset="1" stopColor="#FFD49C" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>

                  <div className="step-text">
                    <h3 className="step-title">
                      Step {step.id}. {step.title}
                    </h3>
                    <p className="step-description">{step.description}</p>
                    <button className="button-reversed">See Examples</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DesignProcess;
