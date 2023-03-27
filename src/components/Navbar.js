import { useContext } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { UserContext } from "../App";

const Navbar = () => {
  const [user, setUser] = useContext(UserContext);

  const handleLogout = () => {
    localStorage.removeItem("USER");
    setUser(localStorage.getItem("USER"));
  };

  return (
    <>
      <nav className="navbar navbar-dark navbar-expand-lg bg-primary sticky-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Library Management Tool
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/books">
                  Books
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/publishers">
                  Publishers
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/members">
                  Members
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/issue">
                  Issue Secion
                </NavLink>
              </li>
            </ul>
            <button className="btn btn-light btn-sm" onClick={handleLogout}>
              Log Out
            </button>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
