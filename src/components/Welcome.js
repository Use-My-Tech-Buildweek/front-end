import React from "react";
import Item from "./Item";
import { itemsWrapperStyle, h4Style } from "./styles/styles";

const Welcome = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("search form submitted");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <form action="submit" onSubmit={handleSubmit}>
        <div
          className="row"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p>I'm looking for</p>
          <div
            className="input-field col s12 m8 offset-m2 l6 offset-l3"
            style={{
              border: "1px solid black",
              borderRadius: "4px",
              marginLeft: "1em",
            }}
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
