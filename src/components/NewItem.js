import { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import axios from 'axios'
import schema from '../schemas/newItemSchema'
import * as yup from 'yup'


const NewItem = ({ addItem }) => {

  const history = useHistory();

  const defaultItem = {
    itemName: '',
    itemDescription: '',
    itemPrice: 0,
  }

  const defaultErrors = {
    itemName: '',
    itemDescription: '',
    itemPrice: 0,
  }
  const [ errors, setErrors ] = useState(defaultErrors) 
  const [ newItem, setNewItem ] = useState(defaultItem)
  const [ disable, setDisable ] = useState(true)

  const submitForm = evt => {
    evt.preventDefault()
    // TODO: get the real user id to send the item
    const userID = "1"
    const url = "https://ptpt-use-my-tech5.herokuapp.com/api/users/" + userID + "/items"
    axios.post(url, newItem)
      .then(resp => {
        console.log(resp.data)
        setNewItem(defaultItem)
      })
      .catch(err => console.log(err.message))
  }

  const change = e => {
    setNewItem({
      ...newItem,
      [e.target.name]: e.target.value,
    })
    yup.reach(schema, e.target.name)
      .validate(e.target.value)
      .then(() => setErrors({...errors, [e.target.name]: ""}))
      .catch(err => setErrors({...errors, [e.target.name]: err.message})) 
  }

  useEffect(() => {
    schema.isValid(newItem)
    .then(valid => { setDisable(!valid) })
  }, [newItem])

  return (
    <>
      <h2>Add a new item</h2>
      <form>
        <label>
          Item name
          <p>{errors.itemName}</p>
          <input name="itemName" type="text" onChange={change} value={newItem.itemName}/>
        </label>
        <label>
          Description
          <p>{errors.itemDescription}</p>
          <textarea name="itemDescription" onChange={change} value={newItem.itemDescription}/>
        </label>
        <label>
          Price
          <p>{errors.itemPrice}</p>
          <input name="itemPrice" type="number" onChange={change} value={newItem.itemPrice} min="0"/>
        </label>
        {/* <label>
          Pictures
          <input
            name="itemPictures"
            type="file"
            accept=".jpg,.jpeg,.png"
            placeholder="item pictures..."
            multiple
            onChange={change}
          />
        </label> */}
        <button type="submit" onClick={() => submitForm()} disabled={disable}>Add this Item</button>
      </form>
      <button onClick={() => history.push('/myItems')}> Go back to my items </button>
    </>
  );
};

export default NewItem;
