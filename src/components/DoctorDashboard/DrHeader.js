import { useCallback, memo } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import MICS from "../../img/mics.png";

const DrHeader = memo(() => {
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

  const navLinkClass = useCallback(
    ({ isActive }) => `nav-link ${isActive ? "active" : ""}`,
    []
  );

  return (
    <header id="header" className="fixed-top no-topmenu">
      <div className="container d-flex align-items-center">
        <h1 className="logo me-auto">
          <Link to="/drdashboard" aria-label="Home" className="d-inline-block">
            <img
              src={MICS}
              alt="MLICS Logo"
              className="img-fluid"
              width="120"
              height="40"
              loading="lazy"
              decoding="async"
              style={{ cursor: "pointer" }}
            />
          </Link>
        </h1>

        <nav className="nav-menu d-none d-lg-block">
          <ul className="d-flex align-items-center gap-3 mb-0">
            <li className="nav-item">
              <NavLink
                to="/drdashboard"
                className={navLinkClass}
                end
                style={{ cursor: "pointer" }}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/drdashboard/drlabs"
                className={navLinkClass}
                style={{ cursor: "pointer" }}
              >
                Labs
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/drdashboard/drrequest"
                className={navLinkClass}
                style={{ cursor: "pointer" }}
              >
                Request
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/drdashboard/contactus"
                className={navLinkClass}
                style={{ cursor: "pointer" }}
              >
                Contact
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/"
                onClick={handleLogout}
                className={navLinkClass}
                style={{ cursor: "pointer" }}
              >
                Logout
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
});

export default DrHeader;
