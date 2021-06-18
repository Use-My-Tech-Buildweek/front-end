/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link, useRouteMatch } from "react-router-dom";
import React, { useEffect, useState } from "react";
import M from "materialize-css";
import { navButtonStyle } from "./styles/styles";

const Navbar = (props) => {
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

  const { links } = props;

  
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
              <Link to="/items">My Items</Link>
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
        {links.map((link, index) => (
          <li key={`sidenav_${index}`}>
            {/* not toggling class as expected - location is not updating */}
            <Link className={location !== path ? "" : "active"} to={link.route}>
              {link.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
