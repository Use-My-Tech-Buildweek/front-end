import Item from "./Item";
import { useHistory } from "react-router-dom";
import { itemsWrapperStyle } from "./styles/styles";

const MyItems = () => {
  const history = useHistory();
  
  return (
    <div>
      <div className="button-wrapper center-align" style={{marginTop: "1em"}} >
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
export default MyItems;
