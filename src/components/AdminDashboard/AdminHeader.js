import { useCallback } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
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

  const navLinkClass = useCallback(
    ({ isActive }) => `nav-link ${isActive ? "active" : ""}`,
    []
  );

  return (
    <header id="header" className="fixed-top no-topmenu">
      <div className="container d-flex align-items-center">
        <h1 className="logo mr-auto">
          <Link to="/admindashboard" style={{ cursor: "pointer" }}>
            <img src={MLICS} alt="MLICS Logo" className="img-fluid" />
          </Link>
        </h1>

        <nav className="nav-menu d-none d-lg-block">
          <ul style={navListStyle}>
            <li>
              <NavLink
                to="/admindashboard"
                className={navLinkClass}
                style={navLinkStyle}
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admindashboard/add_doctor"
                className={navLinkClass}
                style={navLinkStyle}
              >
                Doctors
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admindashboard/labs"
                className={navLinkClass}
                style={navLinkStyle}
              >
                Labs
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admindashboard/request"
                className={navLinkClass}
                style={navLinkStyle}
              >
                Request
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/"
                onClick={handleLogout}
                className={navLinkClass}
                style={navLinkStyle}
              >
                Logout
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

// Simple styles for pointer interactions
const navListStyle = {
  display: "flex",
  listStyle: "none",
  margin: 0,
  padding: 0,
  gap: "20px",
  alignItems: "center",
};

const navLinkStyle = {
  cursor: "pointer",
  textDecoration: "none",
  padding: "5px 0",
  transition: "color 0.2s",
};

// Add these styles to your CSS file
const additionalStyles = `
  .nav-link {
    color: #333;
  }
  
  .nav-link:hover {
    color: #007bff;
  }
  
  .nav-link.active {
    color: #007bff;
    font-weight: 500;
  }
`;

// Inject the styles
const styleSheet = document.createElement("style");
styleSheet.innerText = additionalStyles;
document.head.appendChild(styleSheet);

export default AdminHeader;
