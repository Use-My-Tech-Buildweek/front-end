import React from 'react';


const Item = (props) => {
  const { pictures, description, price, user } = props;

  return (
    <>
      <div className="row">
        <div className="col s12 m7">
          <div className="card">
            {/* IMAGE CAROUSEL */}
            <span className="card-title">Title</span>
          </div>
          <div className="card-content">
            <div>
              <p>item.name</p>
              <p>user.ratings</p>
            </div>
            <div>
              <h2>description</h2>
              <p>this is a very good item , lorem ipsum etc etc...</p>
            </div>
          </div>
          <div className="card-action">
            <p>price $/day</p>
            <button> Rent</button>
          </div>
        </div>
      </div>

      <div>
        <p>picture1</p>
        <p>picture2</p>
        <p>....</p>
        {/* {pictures.map((pic) => {
                return(
                    <img src={pic.src} alt={pic.alt} />
                )
            })} */}
      </div>

      <div></div>
    </>
  );
};

export default Item;
