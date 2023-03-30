import { useContext, useEffect } from "react";
import { Link, NavLink, Outlet, Navigate } from "react-router-dom";
import { UserContext } from "../App";

const Navbar = () => {
  const [user, setUser] = useContext(UserContext);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("USER")));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("USER");
    setUser(localStorage.getItem("USER"));
  };

  if (!user) {
    return <Navigate to={"/login"} />;
  } else {
    return (
      <>
        <nav className="navbar navbar-expand-lg sticky-top">
          <div className="container">
            <Link className="navbar-brand" to="/">
              Library Management Tool
            </Link>
            <button
              className="navbar-toggler text-white"
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
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">
                    <i className="fa fa-house"></i> Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/books">
                    <i className="fa fa-book"></i> Books
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/publishers">
                    <i className="fa fa-user-pen"></i> Publishers
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/members">
                    <i className="fa fa-user-group"></i> Members
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/issue">
                    <i className="fa fa-swatchbook"></i> Issue Section
                  </NavLink>
                </li>
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    to="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Welcome,{" "}
                    <span className="text-uppercase fw-bold">{user.name}!</span>
                  </Link>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" to="/profile">
                        Account
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" onClick={handleLogout}>
                        Logout
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <Outlet />
        <footer className="text-center text-lg-start text-white bg-dark">
          <section className="d-flex justify-content-between p-3 bg-primary">
            <div className="me-5">
              <span>
                Created by{" "}
                <Link
                  to="https://github.com/Siddhu2543/"
                  className="text-white me-4"
                >
                  Siddharth Vadgama
                </Link>
              </span>
            </div>

            <div>
              <Link
                to="https://github.com/Siddhu2543/Library-Management-Tool-Client"
                className="text-white me-4"
                style={{ textDecoration: "none" }}
              >
                Github Repo Link: <i className="fab fa-github fa-lg"></i>
              </Link>
            </div>
          </section>
        </footer>
      </>
    );
  }
};

export default Navbar;
