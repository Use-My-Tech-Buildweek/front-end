/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link, useRouteMatch, useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import M from "materialize-css";

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
  const history = useHistory();

  const navButtonStyle = {
    padding: "8px",
    margin: "0.5em",
    display: "inline-flex",
    justifyContent: "space-between",
    alignItems: "center"
  };

  const handleClick = (e) => {
    e.preventDefault();
    history.push(e.target.data_nav);
  };

  return (
    <div className="nav-wrapper" >
      <nav style={{padding: "0 1em"}} className="valign-wrapper" >
        <a href="#" data-target="responsive-nav" className="sidenav-trigger">
          <i className="material-icons">menu</i>
        </a>
        <div
          style={{ width: "100%" }}
          id="nav-mobile"
          className="right hide-on-med-and-down"
        >
          <button
            onClick={handleClick}
            style={navButtonStyle}
            data_nav="/"
            className="waves-effect-light btn"
          >
            <span className="valign-wrapper">Home</span>
          </button>
          <button
            onClick={handleClick}
            style={navButtonStyle}
            data_nav="/items"
            className="waves-effect-light btn"
          >
            <span className="valign-wrapper">My Items</span>
          </button>
          <button
            onClick={handleClick}
            style={navButtonStyle}
            data_nav="/login"
            className="right waves-effect-light btn"
          >
            <span className="valign-wrapper">Log In</span>
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
