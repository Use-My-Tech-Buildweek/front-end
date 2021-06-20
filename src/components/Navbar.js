/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link, useRouteMatch } from "react-router-dom";
import React, { useEffect, useState } from "react";
import M from "materialize-css";
import { navButtonStyle } from "./styles/styles";

const Navbar = () => {
  const [location, setLocation] = useState("/");

  //   TODO: disable the navigation link for the current page
  let { path } = useRouteMatch();

  useEffect(() => {
    // Initialize responsive menu elements
    const elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);
  }, []);

  useEffect(() => {
    setLocation(path);
    console.log(path, location);
  }, [path, location]);

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
          <button style={navButtonStyle} className="waves-effect-light btn">
            <span className="valign-wrapper">
              <Link to="/">Home</Link>
            </span>
          </button>
          <button style={navButtonStyle} className="waves-effect-light btn">
            <span className="valign-wrapper">
              <Link to="/profile/:userId">My Profile</Link>
            </span>
          </button>
          <button
            style={navButtonStyle}
            className="right waves-effect-light btn"
          >
            <span className="valign-wrapper">
              <Link to="/login">Log In</Link>
            </span>
          </button>
        </div>
      </nav>
      <ul className="sidenav" id="responsive-nav">
        <li><Link to="/" >Home</Link></li>
        <li><Link to="/items" >My Items</Link></li>
        <li><Link to="/login" >Log In</Link></li>
      </ul>
    </div>
  );
};

export default Navbar;
