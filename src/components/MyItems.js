import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import Item from "./Item";
import { buttonWrapperStyle, itemsWrapperStyle } from "./styles/styles";

const MyItems = (props) => {
  const history = useHistory();

  return (
    <div>
      <div className="button-wrapper center-align" style={buttonWrapperStyle}>
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
        <Item />
        <Item />
        <Item />
        {/*  */}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    items: state.items,
  };
};
export default connect(mapStateToProps, {})(MyItems);
