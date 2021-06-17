import { Link } from "react-router-dom";
import React from "react";

const NavBar = (props) => {
  const { links } = props;
  return (
    <nav>
      <ul>
        {links.map((link, index) => (
          <li key={index}>
            <Link to={link.route}>{link.text}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
