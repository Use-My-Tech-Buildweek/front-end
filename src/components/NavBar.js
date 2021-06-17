import { Link, useRouteMatch } from "react-router-dom";
import React, { useEffect, useState } from "react";

const NavBar = (props) => {
  const [location, setLocation] = useState("/");
  //   can't get this to update on navigation. I want to disable the navigation link for the current page
  let { path } = useRouteMatch();

  useEffect(() => {
    setLocation(path);
    console.log(location);
  }, [path, location]);

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
