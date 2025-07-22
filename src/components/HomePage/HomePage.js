import React, { useState } from "react";
import { Link } from "react-scroll";
import { NavLink } from "react-router-dom";
import { Modal } from "react-bootstrap";
import Header from "./Header";
import Login from "./Login";

const HomePage = () => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <div className="homepage">
      <TopBar />
      <Header />
      <HeroSection onLoginClick={() => setModalShow(true)} />
      
      <main id="main">
        <AboutSection />
        <ContactSection />
      </main>
      
      <Footer />
      <BackToTopLink />
      <LoginModal show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  );
};

// TopBar Component
const TopBar = () => (
  <div id="topbar" className="d-none d-lg-flex align-items-center fixed-top">
    <div className="container d-flex">
      <div className="contact-info mr-auto">
        <i className="icofont-envelope" />
        <a href="mailto:contact@MLICS.com">contact@mlics.com</a>
        <i className="icofont-phone" /> +1-541-754-3010
        <i className="icofont-google-map" /> A108 Adam Street, NY
      </div>
      <div className="social-links">
        {['twitter', 'facebook', 'instagram', 'skype', 'linkedin'].map((platform) => (
          <SocialLink key={platform} platform={platform} />
        ))}
      </div>
    </div>
  </div>
);

const SocialLink = ({ platform }) => (
  <a 
    href={`https://www.${platform}.com/`} 
    target="_blank" 
    rel="noopener noreferrer"
    className={platform}
  >
    <i className={`icofont-${platform}`} />
  </a>
);

const HeroSection = ({ onLoginClick }) => (
  <section id="hero" className="d-flex align-items-center no-padding">
    <div className="container">
      <h1>
        Medical Integration <br />
        Cloud Services
      </h1>
      <NavLink
        to="#"
        className="btn-get-started scrollto col-md-2 text-center white-btn"
        onClick={(e) => {
          e.preventDefault();
          onLoginClick();
        }}
      >
        Login
      </NavLink>
    </div>
  </section>
);

const AboutSection = () => {
  const features = [
    {
      icon: "bx-fingerprint",
      title: "Lorem Ipsum",
      description: "Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi"
    },
    {
      icon: "bx-gift",
      title: "Nemo Enim",
      description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis"
    },
    {
      icon: "bx-atom",
      title: "Dine Pad",
      description: "Explicabo est voluptatum asperiores consequatur magnam. Et veritatis odit."
    }
  ];

  return (
    <section id="about" className="about">
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-5 col-lg-6 video-box d-flex justify-content-center align-items-stretch">
            {/* Video placeholder */}
          </div>
          <div className="col-xl-7 col-lg-6 icon-boxes d-flex flex-column align-items-stretch justify-content-center py-5 px-lg-5">
            <h3>Enim quis est voluptatibus aliquid consequatur fugiat</h3>
            <p>
              Esse voluptas cumque vel exercitationem. Reiciendis est hic
              accusamus. Non ipsam et sed minima temporibus laudantium.
              Soluta voluptate sed facere corporis dolores excepturi.
              Libero laboriosam sint et id nulla tenetur. Suscipit aut
              voluptate.
            </p>
            {features.map((feature, index) => (
              <FeatureIconBox 
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const FeatureIconBox = ({ icon, title, description }) => (
  <div className="icon-box">
    <div className="icon">
      <i className={`bx ${icon}`} />
    </div>
    <h4 className="title">
      <a href="#">{title}</a>
    </h4>
    <p className="description">{description}</p>
  </div>
);

const ContactSection = () => {
  const contactInfo = [
    {
      icon: "icofont-google-map",
      title: "Location:",
      content: "A108 Adam Street, New York, NY 535022"
    },
    {
      icon: "icofont-envelope",
      title: "Email:",
      content: "info@mlics.com"
    },
    {
      icon: "icofont-phone",
      title: "Call:",
      content: "+1 5589 55488 55s"
    }
  ];

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="section-title">
          <h2>Contact</h2>
          <p>
            Magnam dolores commodi suscipit. Necessitatibus eius
            consequatur ex aliquid fuga eum quidem. Sit sint consectetur
            velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit
            suscipit alias ea. Quia fugiat sit in iste officiis commodi
            quidem hic quas.
          </p>
        </div>
      </div>
      <div>
        <iframe
          title="Contact Location"
          style={{ border: 0, width: "100%", height: "350px" }}
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12097.433213460943!2d-74.0062269!3d40.7101282!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb89d1fe6bc499443!2sDowntown+Conference+Center!5e0!3m2!1smk!2sbg!4v1539943755621"
          frameBorder="0"
          allowFullScreen
        />
      </div>
      <div className="container">
        <div className="row mt-5">
          <div className="col-lg-4">
            <div className="info">
              {contactInfo.map((info, index) => (
                <div key={index} className="address">
                  <i className={info.icon} />
                  <h4>{info.title}</h4>
                  <p>{info.content}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="col-lg-8 mt-5 mt-lg-0">
            {/* Form implementation would go here */}
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  const usefulLinks = [
    { name: "Home", to: "hero" },
    { name: "About", to: "about" },
    { name: "Services", href: "#services" },
    { name: "Terms of service", href: "#services" },
    { name: "Privacy policy", href: "#policy" }
  ];

  const servicesLinks = [
    { name: "Web Design", href: "#design" },
    { name: "Web Development", href: "#development" },
    { name: "Product Management", href: "#management" },
    { name: "Marketing", href: "#marketing" },
    { name: "Graphic Design", href: "#graphicdesign" }
  ];

  return (
    <footer id="footer">
      <div className="footer-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 footer-contact">
              <h3>MLICS</h3>
              <p>
                A108 Adam Street <br /> New York, NY 535022
                <br /> United States <br />
                <br />
                <strong>Phone:</strong> +1 5589 55488 55
                <br />
                <strong>Email:</strong> info@mlics.com
                <br />
              </p>
            </div>

            <FooterLinks title="Useful Links" links={usefulLinks} />
            <FooterLinks title="Our Services" links={servicesLinks} />

            <div className="col-lg-4 col-md-6 footer-newsletter">
              <h4>Join Our Newsletter</h4>
              <p>
                Tamen quem nulla quae legam multos aute sint culpa legam
                noster magna
              </p>
              {/* Newsletter form would go here */}
            </div>
          </div>
        </div>
      </div>

      <div className="container d-md-flex py-4">
        <div className="mr-md-auto text-center text-md-left">
          <div className="copyright">
            Copyright @ {new Date().getFullYear()}{" "}
            <strong>
              <span>MLICS</span>
            </strong>
            . All Rights Reserved
          </div>
          <div className="credits">
            Designed by{" "}
            <a href="https://www.jp.com/" target="_blank" rel="noopener noreferrer">
              Jp
            </a>
          </div>
        </div>
        <div className="social-links text-center text-md-right pt-3 pt-md-0">
          {['twitter', 'facebook', 'instagram', 'skype', 'linkedin'].map((platform) => (
            <SocialLink key={platform} platform={platform} icon={`bxl-${platform}`} />
          ))}
        </div>
      </div>
    </footer>
  );
};

const FooterLinks = ({ title, links }) => (
  <div className="col-lg-2 col-md-6 footer-links">
    <h4>{title}</h4>
    <ul>
      {links.map((link, index) => (
        <li key={index}>
          <i className="bx bx-chevron-right" />{" "}
          {link.to ? (
            <Link to={link.to} spy smooth>
              {link.name}
            </Link>
          ) : (
            <a href={link.href}>{link.name}</a>
          )}
        </li>
      ))}
    </ul>
  </div>
);

const BackToTopLink = () => (
  <Link to="hero" className="back-to-top" spy smooth>
    <i className="icofont-simple-up" />
  </Link>
);

const LoginModal = ({ show, onHide }) => (
  <Modal
    show={show}
    onHide={onHide}
    size="lg"
    aria-labelledby="login-modal-title"
    centered
    backdrop="static"
  >
    <Modal.Header closeButton className="headerBg">
      <Modal.Title className="modal-title w-100 text-center">
        Login
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Login />
    </Modal.Body>
  </Modal>
);

export default HomePage;