import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone, faLocationPin } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import "./Contact.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const sectionRef = useRef(null);
  const formRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = `mailto:moradsheblpaik@gmail.com?subject=Hello Morad I am ${formData.name}&body=${formData.message}`;
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(".contact-title", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      })
        .from(
          ".contact-card",
          {
            y: 50,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.5"
        )
        .from(
          ".contact-info",
          {
            x: -30,
            opacity: 0,
            stagger: 0.2,
            duration: 0.6,
          },
          "-=0.3"
        );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="contact-section" ref={sectionRef} id="contact">
      <div className="contact-container">
        <h2 className="contact-title">
          Get in <span className="accent">Touch</span>
          <span className="sparkle contact-sparkle">✨</span>
        </h2>

        <div className="contact-content">
          <div className="contact-card">
            <form ref={formRef} onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="button-reversed" onClick={handleSubmit}>
                Send Message
              </button>
            </form>
          </div>

          <div className="contact-info-container">
            <div className="contact-info">
              <div className="info-icon"><FontAwesomeIcon icon={ faEnvelope } /></div>
              <div className="info-content">
                <h3>Email</h3>
                <p>moradsheblpaik@gmail.com</p>
              </div>
            </div>
            <div className="contact-info">
              <div className="info-icon"><FontAwesomeIcon icon={ faPhone } /></div>
              <div className="info-content">
                <h3>Phone</h3>
                <p>+20 1282 9899 89</p>
              </div>
            </div>
            <div className="contact-info">
              <div className="info-icon"><FontAwesomeIcon icon={ faLocationPin } /></div>
              <div className="info-content">
                <h3>Location</h3>
                <p>Alex, Egypt</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;