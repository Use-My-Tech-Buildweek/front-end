import { useHistory } from 'react-router-dom'
const NewItem = () => {
    const history = useHistory()
    return(
        <>
        <h2>Add a new item</h2>
        <form>
            <label>
                Item name
                <input name="itemName" type="text" />
            </label>
            <label>
                Description
                <textarea name="itemDescription" />
            </label>
            <label>
                Price
                <input name="itemPrice" type="number" />
            </label>
            <label>
                Pictures
                <input name="itemPictures" type="file" accept=".jpg,.jpeg,.png" placeholder="item pictures..." multiple/>
            </label>
            <button>Add this Item</button> 
        </form>
        <button onClick={() => history.goBack()} >Cancel</button>
        </>
    )
}

export default NewItem