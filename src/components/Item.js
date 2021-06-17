import React from "react";

const Item = (props) => {
  // eslint-disable-next-line no-unused-vars
  const { pictures, description, price, user } = props;

  return (
    <div className="row" style={{display: "flex", flexDirection: "row", border: "1px solid green", justifyContent: "center"}} >
      <div className="col s12 m8 offset-m1">
        <div className="card">
          {/* IMAGE CAROUSEL */}
          <span className="card-title">Title</span>
        </div>
        <div className="card-content">
          <div>
            <h5>Item Name</h5>
            <p>User ratings</p>
          </div>
          <div>
            <h6>Item Description</h6>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quando
              enim Socrates, qui parens philosophiae iure dici potest, quicquam
              tale fecit? <i>Sed nimis multa.</i> Sint ista Graecorum; Nobis
              aliter videtur, recte secusne, postea; Quae diligentissime contra
              Aristonem dicuntur a Chryippo. Duo Reges: constructio interrete.
              <i>Non dolere, inquam, istud quam vim habeat postea videro;</i>
            </p>
          </div>
        </div>
        <div className="card-action">
          <p>Price {price || "$4.20"}/day</p>
          <button
            className="waves-effect-light btn"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <i className="material-icons" style={{ marginRight: ".5em" }}>
              add_shopping_cart
            </i>
            Rent
          </button>
        </div>
      </div>
    </div>
  );
};

export default Item;
