import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-scroll";
import { Modal } from "react-bootstrap";
import MLICS from "../../img/mics.png";
import Login from "./Login";
import PropTypes from "prop-types";

const Header = () => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <header id="header" className="fixed-top" style={headerStyle}>
      <div className="container d-flex align-items-center">
        <div className="logo mr-auto">
          <NavLink to="/" className="d-flex align-items-center">
            <img
              src={MLICS}
              alt="Company Logo"
              className="img-fluid"
              style={logoStyle}
            />
          </NavLink>
        </div>

        <nav className="nav-menu d-none d-lg-block">
          <ul style={navListStyle}>
            <li>
              <Link
                to="hero"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                className="nav-link"
                activeClass="active"
                style={navLinkStyle}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="about"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                className="nav-link"
                activeClass="active"
                style={navLinkStyle}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="contact"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                className="nav-link"
                activeClass="active"
                style={navLinkStyle}
              >
                Contact
              </Link>
            </li>
            <li>
              <button
                className="login-btn"
                onClick={() => setModalShow(true)}
                aria-label="Open login modal"
                style={loginButtonStyle}
              >
                Login
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <LoginModal show={modalShow} onHide={() => setModalShow(false)} />
    </header>
  );
};

const LoginModal = ({ show, onHide }) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="login-modal-title"
      centered
      backdrop="static"
    >
      <Modal.Header closeButton className="headerBg">
        <Modal.Title id="login-modal-title" className="w-100 text-center">
          Login
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Login />
      </Modal.Body>
    </Modal>
  );
};

LoginModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};

// Simple styles for pointer interactions
const headerStyle = {
  backgroundColor: "#fff", // Assuming white background
  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
};

const logoStyle = {
  cursor: "pointer",
  transition: "opacity 0.2s",
};

const navListStyle = {
  display: "flex",
  listStyle: "none",
  margin: 0,
  padding: 0,
  alignItems: "center",
  gap: "20px",
};

const navLinkStyle = {
  cursor: "pointer",
  color: "#333",
  textDecoration: "none",
  padding: "8px 0",
  position: "relative",
  transition: "color 0.2s",
};

const loginButtonStyle = {
  cursor: "pointer",
  backgroundColor: "transparent",
  border: "1px solid #007bff",
  color: "#007bff",
  borderRadius: "4px",
  padding: "8px 16px",
  transition: "all 0.2s",
};

// Add this CSS to your global styles
const additionalStyles = `
  .nav-link:hover {
    color: #007bff !important;
  }
  
  .nav-link.active {
    color: #007bff !important;
    font-weight: bold;
  }
  
  .nav-link.active::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #007bff;
  }
  
  .login-btn:hover {
    background-color: #007bff !important;
    color: white !important;
  }
  
  .logo:hover img {
    opacity: 0.8;
  }
`;

// Inject the styles
const styleSheet = document.createElement("style");
styleSheet.innerText = additionalStyles;
document.head.appendChild(styleSheet);

export default Header;
