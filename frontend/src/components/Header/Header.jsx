import { React } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import "jquery";
import "bootstrap";
import "./Header.css";

const navItems = ["Home", "Login", "Admin"];

function Header() {
  // <!-- Header Section start here -->

  var userInfo = localStorage.getItem("userData");
  const history = useHistory();

  if (userInfo && !userInfo == "") {
    userInfo = JSON.parse(localStorage.getItem("userData"));
    var admin = userInfo.admin;
  }
  const handleLogoutClick = () => {
    var loaderEle = document.querySelector(".lds-dual-ring");
    loaderEle.classList.add("active");
    document.querySelector(".form-section")?.classList.add("dsp-none");
    document.querySelector(".header").classList.add("dsp-none");
    axios
      .post("/logout", {
        email: userInfo.user.user.email,
        token: userInfo.token,
      })
      .then((response) => {
        console.log(response.data);
        localStorage.removeItem("userData");
        history.push("/");
        window.location.reload();
        var loaderEle = document.querySelector(".lds-dual-ring");
        loaderEle.classList.remove("active");
        document.querySelector(".form-section").classList.remove("dsp-none");
        document.querySelector(".header").classList.remove("dsp-none");
        // do something with the response data
      })
      .catch((error) => {
        console.log(error);
        let msgV = error.response.data.msg;
        if (msgV === "Invalid token") {
          localStorage.removeItem("dataLocal");
          localStorage.removeItem("filledData");
          localStorage.removeItem("userData");
          localStorage.removeItem("dataLimit");
          history.push("/");
        }
        var loaderEle = document.querySelector(".lds-dual-ring");
        loaderEle.classList.remove("active");
        document.querySelector(".form-section").classList.remove("dsp-none");
        document.querySelector(".header").classList.remove("dsp-none");
        alert("Server Error");
      });
  };

  const handleNavItemClick = (event) => {
    // Handle the click event here
    console.log("Nav-item clicked:", event.target.textContent);
  };

  return (
    <section className="header">
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
                  if (userInfo && navItemName === "Login") {
                    return null; // hide Login nav-item when user is logged in
                  }
                  if (!admin && navItemName === "Admin") {
                    return null; // hide Login nav-item when user is logged in
                  }
                  if (!userInfo && navItemName === "Home") {
                    return null; // hide Login nav-item when user is logged in
                  }
                  return (
                    <li
                      className="nav-item"
                      key={navItemName}
                      onClick={handleNavItemClick}
                    >
                      <Link to={"/" + navItemName} className="nav-link">
                        {navItemName}
                      </Link>
                    </li>
                  );
                })}
              </div>
            </div>
          </ul>
          <div className={`nav-item dropdown ${userInfo ? "" : "dsp-none"}`}>
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
