import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./RollingSection.css";
import techsData from "../data/techs.json";

const { techs } = techsData;

export default function RollingSection() {
  const trackRef = useRef(null);
  const rollingTechs = [...techs, ...techs];

  useEffect(() => {
    const animation = gsap.to(trackRef.current, {
      x: "-50%",
      duration: 30,
      ease: "linear",
      repeat: -1,
    });

    return () => animation.kill();
  }, []);

  return (
    <div className="rolling-section">
      <div className="rolling-track" ref={trackRef}>
        {rollingTechs.map((tech, idx) => (
          <>
            <div className="rolling-item" key={idx}>
              <span key={tech}>{tech}</span>
            </div>
            <span
              className="asterisk"
              key={`asterisk-${idx}`}
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              ✱
            </span>
          </>
        ))}
      </div>
    </div>
  );
}
