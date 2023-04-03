import { React } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "jquery";
import "bootstrap";
import "./Header.css";

const navItems = ["Home", "Login", "Admin"];

function Header() {
  // <!-- Header Section start here -->

  var userInfo = localStorage.getItem("userData");

  if (userInfo && !userInfo == "") {
    userInfo = JSON.parse(localStorage.getItem("userData"));
  }
  if (userInfo && !userInfo == "") {
    userInfo = JSON.parse(localStorage.getItem("userData"));
  }
  const handleLogoutClick = () => {
    axios
      .post("http://localhost:3000/logout", {
        email: userInfo.user.user.email,
        token: userInfo.token,
      })
      .then((response) => {
        console.log(response.data);
        // do something with the response data
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <section>
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <ul className="navbar-nav mr-auto">
            <div className="mobile-wrapper-nav-icon">
              <Link to="/Home" className="navbar-brand">
                Doctor/Name
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasDarkNavbar"
                aria-controls="offcanvasDarkNavbar"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>
            <div
              className="offcanvas offcanvas-end text-bg-dark"
              tabIndex="-1"
              id="offcanvasDarkNavbar"
              aria-labelledby="offcanvasDarkNavbarLabel"
            >
              <div className="d-flex nav-mobile">
                <h5
                  className="offcanvas-title desktop-dsp-none"
                  id="offcanvasDarkNavbarLabel"
                >
                  Mobile Menu
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white desktop-dsp-none"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              <div className="d-flex mobile-d-flex">
                {navItems.map((navItemName) => {
                  // if (!userInfo && navItemName === "Login") {
                  //   return null; // hide Login nav-item when user is logged in
                  // }
                  if (!userInfo && navItemName === "Admin") {
                    return null; // hide Login nav-item when user is logged in
                  }
                  if (!userInfo && navItemName === "Home") {
                    return null; // hide Login nav-item when user is logged in
                  }
                  return (
                    <li className="nav-item" key={navItemName}>
                      <Link to={"/" + navItemName} className="nav-link">
                        {navItemName}
                      </Link>
                    </li>
                  );
                })}
              </div>
            </div>
          </ul>
          <div className={`nav-item dropdown ${userInfo ? '' : 'dsp-none'}`}>
            <a
              className="nav-link dropdown-toggle text-white"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {" "}
              <i className="fas fa-user mx-1"></i> Profile
            </a>
            {/* <!-- Dropdown menu --> */}
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="navbarDropdown"
            >
              <li onClick={handleLogoutClick}>
                <a className="dropdown-item">Log out</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </section>
  );
  // <!-- Header Section end here -->
}

export default Header;
