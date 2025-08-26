import { useRef } from "react";
import DrHeader from "./DrHeader";
import { NavLink } from "react-router-dom";

const ContactUS = () => {
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData);

    try {
      // Here you would typically make an API call
      console.log("Form data:", data);
      // Simulate successful submission
      alert("Your message has been sent. Thank you!");
      formRef.current.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error sending your message. Please try again.");
    }
  };

  return (
    <div>
      <DrHeader />
      <main id="main">
        {/* Breadcrumbs Section */}
        <section className="breadcrumbs">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center">
              <ol>
                <li>
                  <NavLink to="/drdashboard">Home</NavLink>
                </li>
                <li>Contact Us</li>
              </ol>
            </div>

            {/* Contact Section */}
            <section id="contact" className="contact">
              <div className="container">
                <div className="section-title">
                  <h2>Contact</h2>
                  <p>Contact the admin for more details</p>
                </div>
              </div>

              {/* Google Maps Embed */}
              <div>
                <iframe
                  title="Contact US Location"
                  style={{ border: 0, width: "100%", height: "350px" }}
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12097.433213460943!2d-74.0062269!3d40.7101282!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb89d1fe6bc499443!2sDowntown+Conference+Center!5e0!3m2!1smk!2sbg!4v1539943755621"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="container">
                <div className="row mt-5">
                  {/* Contact Info */}
                  <div className="col-lg-4">
                    <div className="info px-3 py-3">
                      <div className="address">
                        <i className="icofont-google-map" />
                        <h4>Location:</h4>
                        <p>A108 Adam Street, New York, NY 535022</p>
                      </div>
                      <div className="email">
                        <i className="icofont-envelope" />
                        <h4>Email:</h4>
                        <p>info@mlics.com</p>
                      </div>
                      <div className="phone">
                        <i className="icofont-phone" />
                        <h4>Call:</h4>
                        <p>+1 5589 55488 95</p>
                      </div>
                    </div>
                  </div>

                  {/* Contact Form */}
                  <div className="col-lg-8 mt-5 mt-lg-0">
                    <form
                      ref={formRef}
                      onSubmit={handleSubmit}
                      className="php-email-form"
                    >
                      <div className="form-row">
                        <div className="col-md-6 form-group">
                          <input
                            type="text"
                            name="name"
                            className="form-control"
                            id="name"
                            placeholder="Your Name"
                            minLength={4}
                            required
                          />
                        </div>
                        <div className="col-md-6 form-group">
                          <input
                            type="email"
                            className="form-control"
                            name="email"
                            id="email"
                            placeholder="Your Email"
                            required
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          name="subject"
                          id="subject"
                          placeholder="Subject"
                          minLength={4}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <textarea
                          className="form-control"
                          name="message"
                          rows={5}
                          required
                          placeholder="Message"
                          defaultValue=""
                        />
                      </div>
                      <div className="text-center">
                        <button type="submit">Send Message</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ContactUS;
