import React from "react";
import Item from "./Item";
import {
  itemsWrapperStyle,
  h4Style,
  searchWrapperStyle,
  searchWrapperInputStyle,
  welcomeWrapperStyle,
} from "./styles/styles";

const Welcome = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("search form submitted");
  };

  return (
    <div id="welcome-wrapper" style={welcomeWrapperStyle}>
      <form action="submit" onSubmit={handleSubmit}>
        <div id="search-wrapper" className="row" style={searchWrapperStyle}>
          <p>I'm looking for</p>
          <div
            className="input-field col s12 m8 offset-m2 l6 offset-l3"
            style={searchWrapperInputStyle}
          >
            <i className="material-icons prefix">search</i>
            <input type="text" id="search_input" className="validate" />
            <label htmlFor="search_input">What are you looking for?</label>
          </div>
        </div>
      </form>
      <div>
        <h4 style={h4Style} className="center-align">
          Electronics
        </h4>
        <div className="items-wrapper" style={itemsWrapperStyle}>
          <Item />
          <Item />
          <Item />
          <Item />
        </div>
      </div>
    </div>
  );
};

export default Welcome;
