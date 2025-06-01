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

  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    message: ''
  });

  const sectionRef = useRef(null);
  const formRef = useRef(null);

  const validateField = (name, value) => {
    switch (name) {
      case 'email':
        return !value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) 
          ? 'Please enter a valid email address' 
          : '';
      case 'name':
        return value.length < 2 ? 'Name must be at least 2 characters' : '';
      case 'message':
        return value.length < 10 ? 'Message must be at least 10 characters' : '';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({
      ...formErrors,
      [name]: validateField(name, value)
    });
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
    <section 
      className="contact-section" 
      ref={sectionRef} 
      id="contact"
      role="region"
      aria-label="Contact form section"
    >
      <div className="contact-container">
        <h2 className="contact-title" tabIndex="0">
          Get in <span className="accent">Touch</span>
          <span className="sparkle contact-sparkle" aria-hidden="true">✨</span>
        </h2>

        <div className="contact-content">
          <div className="contact-card">
            <form 
              ref={formRef} 
              onSubmit={handleSubmit}
              role="form"
              aria-label="Contact form"
            >
              <div className="form-group">
                <label htmlFor="name" className="visually-hidden">Your Name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  aria-required="true"
                  aria-invalid={!!formErrors.name}
                  aria-describedby="name-error"
                />
                {formErrors.name && (
                  <span id="name-error" className="error-message" role="alert">
                    {formErrors.name}
                  </span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="email" className="visually-hidden">Your Email</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  aria-required="true"
                  aria-invalid={!!formErrors.email}
                  aria-describedby="email-error"
                />
                {formErrors.email && (
                  <span id="email-error" className="error-message" role="alert">
                    {formErrors.email}
                  </span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="message" className="visually-hidden">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  aria-required="true"
                  aria-invalid={!!formErrors.message}
                  aria-describedby="message-error"
                />
                {formErrors.message && (
                  <span id="message-error" className="error-message" role="alert">
                    {formErrors.message}
                  </span>
                )}
              </div>
              <button 
                type="submit" 
                className="button-reversed"
                aria-label="Send message"
              >
                Send Message
              </button>
            </form>
          </div>

          <div 
            className="contact-info-container"
            role="complementary"
            aria-label="Contact information"
          >
            <div className="contact-info" tabIndex="0">
              <div className="info-icon" aria-hidden="true">
                <FontAwesomeIcon icon={faEnvelope} />
              </div>
              <div className="info-content">
                <h3>Email</h3>
                <p>
                  <a 
                    href="mailto:moradsheblpaik@gmail.com"
                    aria-label="Send email to moradsheblpaik@gmail.com"
                  >
                    moradsheblpaik@gmail.com
                  </a>
                </p>
              </div>
            </div>
            <div className="contact-info" tabIndex="0">
              <div className="info-icon" aria-hidden="true">
                <FontAwesomeIcon icon={faPhone} />
              </div>
              <div className="info-content">
                <h3>Phone</h3>
                <p>+20 1282 9899 89</p>
              </div>
            </div>
            <div className="contact-info" tabIndex="0">
              <div className="info-icon" aria-hidden="true">
                <FontAwesomeIcon icon={faLocationPin} />
              </div>
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