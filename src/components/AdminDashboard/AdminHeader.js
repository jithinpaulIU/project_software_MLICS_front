import { Fragment, useCallback } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Auth from "../../auth";
import MLICS from "../../img/mics.png";

const AdminHeader = () => {
  const navigate = useNavigate();

  const handleLogout = useCallback(
    (e) => {
      e.preventDefault();
      localStorage.clear();
      navigate("/", { replace: true });
      window.location.reload(); // Ensure complete reset
    },
    [navigate]
  );

  return (
    <Fragment>
      <div>
        {/* ======= Header ======= */}
        <header id="header" className="fixed-top no-topmenu">
          <div className="container d-flex align-items-center">
            <h1 className="logo mr-auto">
              <Link to="/admindashboard">
                <img src={MLICS} alt="" className="img-fluid" />
              </Link>
            </h1>
            {/* Uncomment below if you prefer to use an image logo */}
            {/* <a href="index.html" class="logo mr-auto"><img src="assets/img/logo.png" alt="" class="img-fluid"></a>*/}
            <nav className="nav-menu d-none d-lg-block">
              <ul>
                <li>
                  <NavLink
                    to="/admindashboard"
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admindashboard/add_doctor"
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    Doctors
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admindashboard/labs"
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    Labs
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admindashboard/request"
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    Request
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/" onClick={handleLogout}>
                    Logout
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        {/* End Header */}
      </div>
    </Fragment>
  );
};

export default AdminHeader;
