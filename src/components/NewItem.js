import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux'
import { addNewItem } from '../actions/itemsActions'


const NewItem = props => {

  const history = useHistory();
  const [newItem, setNewItem] = useState({
    availability: 0,
    condition: '',
    daily_rate: '',
    description: '',
    imgs: '',
    item_name: '',
    location: '',
    user_id: props.user.id,
  })

  const changeHandler = e => {
    setNewItem({
      ...newItem,
      [e.target.name]: e.target.value
    });
  }

  const onAdd = e => {
    e.preventDefault()
    props.addNewItem(newItem.user_id, newItem)
  }

  return (
    <>
      <h2>Add a new item</h2>
      <form onSubmit={onAdd}>
        <label>
          Item name
          <input
            name="item_name"
            type="text"
            onChange={changeHandler}
          />
        </label>
        <label>
          Description
          <textarea
            name="description"
            type='text'
            onChange={changeHandler}
          />
        </label>
        <div className='row'>
          <label>
            Number available
            <input
              name='availability'
              type='number'
              onChange={changeHandler}
            />
          </label>
          <label>Daily Rate <input type='number' name='daily_rate' /></label>
          <label>
            Price
            <input
              name="itemPrice"
              type="number"
              onChange={changeHandler}
            />
          </label>
        </div>
        <label>
          Condition
          <input
            type='text'
            name='condition'
            onChange={changeHandler}
          />
        </label>
        <label>Location
          <input
            type='text'
            name='location'
            onChange={changeHandler} />
        </label>
        <label>
          Pictures
          <input
            name="imgs"
            type="file"
            accept=".jpg,.jpeg,.png"
            placeholder="item pictures..."
            onChange={changeHandler}
            multiple
          />
        </label>
        <button>Add this Item</button>

      </form>
      <button onClick={() => history.goBack()}>Cancel</button>
    </>
  );
};
const mapStateToProps = state => {
  return {
    myItems: state.users.myItems,
    items: state.items.items,
    itemList: state.itemList.itemList,
    user: state.users.user
  }
}
export default connect(mapStateToProps, { addNewItem })(NewItem)