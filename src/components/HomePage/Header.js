import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-scroll";
import { Modal } from "react-bootstrap";
import MLICS from "../../img/mics.png";
import Login from "./Login";
import PropTypes from "prop-types"; // Added for prop type checking

const Header = () => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <header id="header" className="fixed-top">
      <div className="container d-flex align-items-center">
        <div className="logo mr-auto">
          <NavLink to="/" className="d-flex align-items-centerss">
            <img src={MLICS} alt="Company Logo" className="img-fluid" />
          </NavLink>
        </div>

        <nav className="nav-menu d-none d-lg-block">
          <ul>
            <li>
              <Link
                to="hero"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                className="nav-link"
                activeClass="active"
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
              >
                Contact
              </Link>
            </li>
            <li>
              <button
                className="login-btn"
                onClick={() => setModalShow(true)}
                aria-label="Open login modal"
              >
                Login
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <LoginModal 
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
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
        <Modal.Title 
          id="login-modal-title"
          className="w-100 text-center"
        >
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

export default Header;