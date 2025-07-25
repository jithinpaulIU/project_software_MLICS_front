import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DrFooter from "./DrFooter";
import DrHeader from "./DrHeader";
import PatientVerification from "./PatientVerfication";
import doctorimg from "../../img/doctor.png";

const DrDashboard = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    // Safely get and parse user info from localStorage
    try {
      const userData = localStorage.getItem("user");
      if (userData) {
        setUserInfo(JSON.parse(userData));
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
  }, []);

  if (!userInfo) {
    return (
      <div className="container text-center py-5">
        <h2>Please login to access the dashboard</h2>
        <Link to="/login" className="btn btn-primary mt-3">
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <DrHeader />

      <main id="main" className="flex-grow-1">
        <section className="breadcrumbs py-3">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center">
              <h2 className="mb-0">Hello {userInfo.firstName}</h2>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to="/drdashboard" className="text-decoration-none">
                      Home
                    </Link>
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </section>

        <section className="inner-page py-5">
          <div className="container">
            <div className="row g-5 align-items-center">
              <div className="col-lg-6">
                <img
                  src={doctorimg}
                  alt="Doctor illustration"
                  className="img-fluid rounded"
                  loading="lazy"
                />
              </div>
              <div className="col-lg-6">
                <PatientVerification />
              </div>
            </div>
          </div>
        </section>
      </main>

      <DrFooter />

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="back-to-top"
        aria-label="Back to top"
      >
        <i className="icofont-simple-up" />
      </button>
    </div>
  );
};

export default DrDashboard;
