import { connect } from 'react-redux'
import { useHistory } from "react-router-dom";

import Item from "./Item";
import { itemsWrapperStyle } from "./styles/styles";

const MyItems = (props) => {
  const history = useHistory();
  console.log(props)
  return (
    <div>
      <div className="button-wrapper center-align" style={{ marginTop: "1em" }} >
        <button
          className="btn waves-effect-light"
          onClick={() => {
            history.push("/additem");
          }}
        >
          {" "}
          Add an Item{" "}
        </button>
      </div>
      <div className="items-wrapper" style={itemsWrapperStyle}>
        {/* add a way to delete item */}
        {/* {itemsList.map(item => {
          return(
            <Item item={item}/>
          )
        })} */}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    items: state.items,
  }
}
export default connect(mapStateToProps, {})(MyItems);
