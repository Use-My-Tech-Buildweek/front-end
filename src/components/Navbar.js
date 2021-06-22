/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import M from "materialize-css";
import { buttonStyle, navMobileStyle, navWrapperStyle } from "./styles/styles";

const Navbar = () => {
  const [location, setLocation] = useState("/");

  // Get current URL path for conditional styling
  const { pathname } = useLocation();

  useEffect(() => {
    // Initialize responsive menu elements
    const elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);
    // Store current URL path in state
    setLocation(pathname);
  }, [pathname]);

  return (
    <div className="nav-wrapper">
      <nav style={navWrapperStyle} className="valign-wrapper">
        <a href="#" data-target="responsive-nav" className="sidenav-trigger">
          <i className="material-icons">menu</i>
        </a>
        <div
          style={navMobileStyle}
          id="nav-mobile"
          className="right hide-on-med-and-down"
        >
          <button
            className={
              location === "/" ? "btn disabled" : "btn waves-effect waves-light"
            }
            style={buttonStyle}
          >
            <span className="valign-wrapper">
              <Link to="/" disabled={location === "/" ? true : false}>
                Home
              </Link>
            </span>
          </button>
          <button
            className={
              location.includes("/profile") || location === "/login"
                ? "btn disabled waves-effect waves-light"
                : "btn waves-effect waves-light"
            }
            style={buttonStyle}
          >
            <span className="valign-wrapper">
              <Link
                to="/profile/:userId"
                disabled={location.includes("/profile") ? true : false}
              >
                My Profile
              </Link>
            </span>
          </button>
          <button
            className={
              location === "/login"
                ? "btn right disabled waves-effect waves-light"
                : "btn right waves-effect waves-light"
            }
            style={buttonStyle}
          >
            <span className="valign-wrapper">
              <Link to="/login" disabled={location === "/login" ? true : false}>
                Log In
              </Link>
            </span>
          </button>
        </div>
      </nav>
      {/* Same links, but these show in the mobile sidebar */}
      <ul className="sidenav" id="responsive-nav">
        <li>
          <Link
            className={location === "/" ? "disabled" : ""}
            to="/"
            disabled={location === "/" ? true : false}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            className={location === "/items" ? "disabled" : ""}
            to="/items"
            disabled={location === "/items" ? true : false}
          >
            My Items
          </Link>
        </li>
        <li>
          <Link
            className={location === "/login" ? "disabled" : ""}
            to="/login"
            disabled={location === "/login" ? true : false}
          >
            Log In
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
