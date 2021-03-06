import { connect } from 'react-redux'
import { useHistory } from "react-router-dom";


import Item from "./Item";
import { itemsWrapperStyle, h4Style } from "./styles/styles";


const MyItems = (props) => {
  const history = useHistory();
  const { triggerModal } = props

  return (
    <div>
      <h4 style={h4Style} className="center-align">My items</h4>
      <div className="button-wrapper center-align" style={{ marginTop: "1em" }} >
        <button
          className="btn waves-effect-light"
          onClick={() => {
            history.push(`/user/${props.user.id}/additem`);
          }}
        >
          {" "}
          Add an Item{" "}
        </button>
      </div>
      <div className="items-wrapper" style={itemsWrapperStyle}>
        {props.myItems.map(item => {
          return (
            <Item item={item} key={item.item_id} triggerModal={triggerModal} />
          )
        })}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    items: state.items.items,
    isUserLoggedIn: state.users.isUserLoggedIn,
    itemList: state.items.itemList,
    myItems: state.users.myItems,
    user: state.users.user,
    item: state.items.item
  }
}
export default connect(mapStateToProps, {})(MyItems);
