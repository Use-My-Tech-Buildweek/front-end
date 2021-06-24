import React from "react";
import { cardStyle } from "./styles/styles";
import { useHistory } from "react-router";
import Modal from './Modal'
import axios from 'axios'
import {deleteItem} from '../actions/itemsActions'

const Item = (props) => {
  const {item,triggerModal} = props
  const { pictures, description, price, user, title, name, id } = item;
  
  const handleDelete = item =>{
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
        <h4>{title}</h4>
      </span>
      <div className="card-content">
        <div>
          <h5>{name}</h5>
          <p>User ratings</p>
        </div>
        <div>
          <h6>{description}</h6>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quando enim
            Socrates, qui parens philosophiae iure dici potest, quicquam tale
            fecit? <i>Sed nimis multa.</i> Sint ista Graecorum; Nobis aliter
            videtur, recte secusne, postea; Quae diligentissime contra Aristonem
            dicuntur a Chryippo. Duo Reges: constructio interrete.
            <i>Non dolere, inquam, istud quam vim habeat postea videro;</i>
          </p>
        </div>
      </div>
      <div className="card-action" style={{ paddingBottom: "1em" }}>
        {/* if user's item use this button delete item */}
        <button
          id='deleteButton'
          className="waves-effect-light btn"
          onClick={()=>triggerModal(id)}
        >
           Delete this item
  
        </button>
        <button
          className="waves-effect-light btn"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <i className="material-icons" style={{ marginRight: ".5em" }}>
            add_shopping_cart
          </i>
          {`Rent for $${price || "4.20"}/day`}
        </button>
      </div>
    </div>
    </>
  );
};

export default Item;
