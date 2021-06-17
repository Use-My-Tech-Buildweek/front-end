/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link, useRouteMatch } from "react-router-dom";
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
  return (
    <div className="nav-wrapper">
      <nav>
        <div className="nav-wrapper">
          <span className="brand-logo">Use My Tech</span>
          <a
            href="#"
            data-target="responsive-nav"
            className="sidenav-trigger"
          >
            <i className="material-icons">menu</i>
          </a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {links.map((link, index) => (
              <li key={`nav-mobile_${index}`}>
                {/* not toggling class as expected - location is not updating */}
                <Link
                  className={location !== path ? "" : "active"}
                  to={link.route}
                >
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
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
