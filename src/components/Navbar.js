/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import M from "materialize-css";
import { navButtonStyle } from "./styles/styles";

const Navbar = () => {
  const [location, setLocation] = useState("/");

  //   TODO: disable the navigation link for the current page
  const { pathname } = useLocation();

  useEffect(() => {
    // Initialize responsive menu elements
    const elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);
    setLocation(pathname);
  }, [pathname]);

  return (
    <div className="nav-wrapper">
      <nav style={{ padding: "0 1em" }} className="valign-wrapper">
        <a href="#" data-target="responsive-nav" className="sidenav-trigger">
          <i className="material-icons">menu</i>
        </a>
        <div
          style={{ width: "100%" }}
          id="nav-mobile"
          className="right hide-on-med-and-down"
        >
          <button
            className={
              location === "/" ? "btn disabled" : "btn waves-effect-light"
            }
            style={navButtonStyle}
          >
            <span className="valign-wrapper">
              <Link to="/" disabled={location === "/" ? true : false}>
                Home
              </Link>
            </span>
          </button>
          <button
            className={
              location.includes("/profile")
                ? "btn disabled"
                : "btn waves-effect-light"
            }
            style={navButtonStyle}
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
                ? "btn right disabled"
                : "btn right waves-effect-light"
            }
            style={navButtonStyle}
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
