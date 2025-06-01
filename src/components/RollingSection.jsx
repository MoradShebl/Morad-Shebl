import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./RollingSection.css";
import techsData from "../data/techs.json";

const { techs } = techsData;

export default function RollingSection() {
  const trackRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const rollingTechs = [...techs, ...techs];

  useEffect(() => {
    const animation = gsap.to(trackRef.current, {
      x: "-50%",
      duration: 30,
      ease: "linear",
      repeat: -1,
      paused: isPaused,
    });

    animation.play();
    return () => animation.kill();
  }, [isPaused]);

  return (
    <div
      className="rolling-section"
      role="marquee"
      aria-label="Technologies I work with"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div
        className="rolling-track"
        ref={trackRef}
        aria-hidden="true"
      >
        {rollingTechs.map((tech, idx) => (
          <div key={`${tech}-${idx}`} className="tech-group">
            <div
              className="rolling-item"
              tabIndex={0}
            >
              <span>{tech}</span>
            </div>
            <span
              className="asterisk"
              aria-hidden="true"
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              ✱
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
