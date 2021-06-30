import { connect } from 'react-redux'
//import { useHistory } from "react-router-dom";

import Item from "./Item";
import { itemsWrapperStyle, h4Style } from "./styles/styles";

const MyCart = (props) => {
  //  const history = useHistory();
  const { triggerModal, cart } = props

  return (
    <div>
      <h4 style={h4Style} className="center-align">My Cart</h4>
      <div className="button-wrapper center-align" style={{ marginTop: "1em" }} >
      </div>
      <div className="items-wrapper" style={itemsWrapperStyle}>
        {/* add a way to delete item */}

        {cart.map(item => {
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
    isUserLoggedIn: state.users.isUserLoggedIn,
    //itemList: state.itemList.itemList,
    items: state.items.items,
    item: state.items.item,
    user: state.users.user,
    cart: state.items.cart,
    userList: state.lists.userList
  }
}

export default connect(mapStateToProps, {})(MyCart)