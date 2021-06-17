import { Link, useRouteMatch } from "react-router-dom";
import React, { useEffect, useState } from "react";

const Navbar = (props) => {
  const [location, setLocation] = useState("/");

  //   can't get this to update on navigation. I want to disable the navigation link for the current page
  let { path } = useRouteMatch();

  useEffect(() => {
    setLocation(path);
    console.log(path, location);
  }, [path, location]);

  const { links } = props;
  return (
    <nav>
      <div className="nav-wrapper">
      <span className="brand-logo">Use My Tech</span>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          {links.map((link, index) => (
            <li key={index}>
              <Link to={link.route}>{link.text}</Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
