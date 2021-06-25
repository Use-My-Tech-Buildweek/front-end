import React from "react";
import {
  cardActionButtonStyle,
  cardActionIconStyle,
  cardActionStyle,
  cardStyle,
} from "./styles/styles";

const Item = (props) => {
  // eslint-disable-next-line no-unused-vars
  const { pictures, description, price, user } = props;

  return (
    <div className="card" style={cardStyle}>
      <span className="card-title">
        <small
          className={
            props.availability !== undefined && props.availability > 0
              ? ""
              : "red-text text-darken-2"
          }
        >
          {props.availability !== undefined
            ? `${props.availability} available`
            : "temporarily unavailable"}{" "}
        </small>
      </span>
      <div className="card-image">
        <span className="card-title">
          {props.item_name !== null ? props.item_name : "props.item_name"}
        </span>
      </div>
      <div className="card-content">
        <div>
          <p>props.description</p>
          <p>
            Condition: {props.condition !== null ? props.condition : "No data"}
          </p>
        </div>
      </div>
      <div className="card-action" style={cardActionStyle}>
        <button
          className="waves-effect-light btn"
          style={cardActionButtonStyle}
        >
          <i className="material-icons" style={cardActionIconStyle}>
            add_shopping_cart
          </i>
          {`Rent for $${
            props.daily_rate !== undefined ? props.daily_rate : "4.20"
          }/day`}
        </button>
      </div>
    </div>
  );
};

export default Item;
