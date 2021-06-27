/* eslint-disable no-unused-vars */
import React from "react";
import { cardStyle } from "./styles/styles";
//import { useHistory } from "react-router";
import Modal from './Modal'
//import axios from 'axios'
import { deleteItem } from '../actions/itemsActions'
import defaultProfile from '../images/defaultProfile.png'
import { connect } from 'react-redux'



const Item = ({ item, triggerModal }) => {

  // import user id
  const mockedUserId = 2
  const { imgs, description, daily_rate, user_id, item_name, id, created_at, condition, availability, location } = item;
  const handleDelete = item => {
    deleteItem(item)
  }




  return (
    <>
      {/* if item is from user */}
      <Modal
        textButton="delete this item"
        actionToConfirm={handleDelete}
        modalId={id}
      />

      <div className="card" style={cardStyle}>
        <span className="card-title">
          <h4>{item_name}</h4>
          {!availability ? <p style={{ color: "orange" }}>Item not available at the moment</p> : null}
        </span>
        <div className="card-content">

          <img src={imgs} alt={`${item_name} avatar`} width="100%" />
          <div>
            <h5>User name</h5>
            {/* TODO import username and rating */}
            <p>User ratings</p>
            <p>Location: {location}</p>
            <p>condition: {condition}</p>
          </div>
          <div>
            <p>{description}</p>
            <p>Online since {created_at.slice(0, 10)}</p>

          </div>
        </div>
        <div className="card-action" style={{ paddingBottom: "1em" }}>
          {user_id === mockedUserId ?
            <button
              id='deleteButton'
              className="waves-effect-light btn"
              onClick={() => triggerModal(id)}
            >
              Delete this item

            </button> : null}

          {/* TODO: if user's item display price as field not button */}
          {user_id !== mockedUserId ?
            <button
              className="waves-effect-light btn"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <i className="material-icons" style={{ marginRight: ".5em" }}>
                add_shopping_cart
              </i>
              {`Rent for $${daily_rate}/day`}
            </button> : null}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return {
    isUserLoggedIn: state.isUserLoggedIn
  }
}
export default connect(mapStateToProps, {})(Item)
