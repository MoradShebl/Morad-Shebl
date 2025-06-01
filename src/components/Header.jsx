import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import "./Header.css";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className="header-container">
        <div className="logo-sec">
          <a href="#home">
            <svg
              width="40"
              height="40"
              viewBox="0 0 475 409"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient
                  id="logo-gradient"
                  x1="0"
                  y1="0"
                  x2="475"
                  y2="0"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor="var(--light1)" />
                  <stop offset="100%" stopColor="var(--light2)" />
                </linearGradient>
              </defs>
              <path
                d="M28.35,0H150a28.34,28.34,0,0,1,27.39,21.06L210.5,145.63c7.48,28.1,47.38,28.07,54.81,0L298.19,21.11A28.35,28.35,0,0,1,325.6,0H447.07a28.35,28.35,0,0,1,28.35,28.35V380.84a28.35,28.35,0,0,1-28.35,28.35H396.81a28.35,28.35,0,0,1-28.35-28.35V315.5c0-33.21-47.28-39.35-55.76-7.24l-21.08,79.82a28.35,28.35,0,0,1-27.41,21.11H211.07a28.35,28.35,0,0,1-27.41-21.13l-20.94-79.4c-8.46-32.12-55.76-26-55.76,7.23v64.95a28.35,28.35,0,0,1-28.35,28.35H28.35A28.35,28.35,0,0,1,0,380.84V28.35A28.35,28.35,0,0,1,28.35,0Z"
                fill="url(#logo-gradient)"
              />
            </svg>
          </a>
        </div>
        <nav className={`header-nav ${isMenuOpen ? "active" : ""}`}>
          <ul>
            <li>
              <a href="#home" onClick={toggleMenu}>
                <FontAwesomeIcon icon={faHome} />
              </a>
            </li>
            <li>
              <a href="#about" onClick={toggleMenu}>
                About
              </a>
            </li>
            <li>
              <a href="#projects" onClick={toggleMenu}>
                Projects
              </a>
            </li>
            <li>
              <a href="#experience" onClick={toggleMenu}>
                Experience
              </a>
            </li>
            <li>
              <a href="#contact" onClick={toggleMenu}>
                Contact me
              </a>
            </li>
          </ul>
        </nav>
        <button
          className={`menu-toggle ${isMenuOpen ? "active" : ""}`}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div className="header-buttons">
          <button
            className="button"
            onClick={() =>
              window.open("https://www.linkedin.com/in/morad-shebl/", "_blank")
            }
          >
            Hire me
          </button>
        </div>
      </header>
    </>
  );
}

export default Header;
