/* eslint-disable no-unused-vars */
import React from "react";
import { cardStyle } from "./styles/styles";
//import { useHistory } from "react-router";
import Modal from './Modal'
//import axios from 'axios'
import { addToCart, deleteItem } from '../actions/itemsActions'
import defaultProfile from '../images/defaultProfile.png'
import { connect } from 'react-redux'




const Item = (props, { item, triggerModal }) => {


  const handleDelete = item => {
    deleteItem(item)
  }




  return (
    <>
      {/* if item is from user 
      <Modal
        textButton="delete this item"
        actionToConfirm={handleDelete}
      // modalId={props.item.id}
      />
      */}
      <div className="card" style={cardStyle}>
        <span className="card-title">
          <h4>{props.item.item_name}</h4>
          {!props.item.availability ? <p style={{ color: "orange" }}>Item not available at the moment</p> : null}
        </span>
        <div className="card-content">

          <img src={props.item.imgs} alt={`${props.item.item_name}`} width="100%" />
          <div>
            <h5>{props.user.username}</h5>
            {/* TODO import username and rating */}
            <p>User ratings</p>
            <p>Location: {props.user.location}</p>
            <p>condition: {props.item.condition}</p>
          </div>
          <div>
            <p>{props.item.description}</p>
            <p>Online since {props.item.created_at.slice(0, 10)}</p>

          </div>
        </div>
        <div className="card-action" style={{ paddingBottom: "1em" }}>
          {props.item.user_id === props.user.user_id ?
            <button
              id='deleteButton'
              className="waves-effect-light btn"
              onClick={() => triggerModal(props.item.id)}
            >
              Delete this item

            </button> : null}

          {/* TODO: if user's item display price as field not button */}
          {props.item.user_id !== props.user.user_id ?
            <button onClick={props.addToCart(props.item.item_id)}
              className="waves-effect-light btn"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <i className="material-icons" style={{ marginRight: ".5em" }}>
                add_shopping_cart
              </i>
              {`Rent for $${props.item.daily_rate}/day`}
            </button> : null}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return {
    isUserLoggedIn: state.users.isUserLoggedIn,
    user: state.users.user
  }
}
export default connect(mapStateToProps, { addToCart })(Item);
