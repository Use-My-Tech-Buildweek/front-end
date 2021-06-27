import React, { useState } from "react";
import { connect } from 'react-redux'

import Item from "./Item";
//import Items from './Items'
import { itemsWrapperStyle, h4Style } from "./styles/styles";

const Welcome = (props) => {
  const [userSearch, setUserSearch] = useState(false)
  const [searchResult, setSearchResult] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const onchange = (e) => {
    e.target.value ? setUserSearch(true) : setUserSearch(false);
    search(e)
  }

  const search = (e) => {
    const lookFor = e.target.value.toLowerCase();
    const res = props.items.filter(item =>
      item.item_name.toLowerCase().includes(lookFor) || item.description.toLowerCase().includes(lookFor)
    )
    setSearchResult(res)
  }

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
            <input data-cy="search_inputBar" type="text" id="search_input" className="validate" onChange={onchange} />
            <label data-cy="search_input" htmlFor="search_input">What are you looking for?</label>
          </div>
        </div>
      </form>
      <div>
        {userSearch ?
          <>
            <h4 style={h4Style} className="center-align">My search</h4>
            <div className="items-wrapper" style={itemsWrapperStyle}>
              {searchResult.length > 0 ?
                searchResult.map(item => { return (<Item key={`item${item.id}`} item={item} key={item.id} triggerModal={props.triggerModal} />) }) :
                "No item found"
              }
            </div>
          </> :
          <>
            <h4 style={h4Style} className="center-align">Last items listed</h4>
            <div className="items-wrapper" style={itemsWrapperStyle}>
              {props.items ? props.items.map(item => {
                return (
                  <Item item={item} triggerModal={props.triggerModal} />)
              })
                :
                ('')}
            </div>
          </>
        }
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    items: state.items,
    isUserLoggedIn: state.isUserLoggedIn

  }
}
export default connect(mapStateToProps, {})(Welcome)
