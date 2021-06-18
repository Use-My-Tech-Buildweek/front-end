import Item from './Item'
import { useHistory } from 'react-router-dom'

const MyItems = () =>{
    const history = useHistory()
    return (
        <>
            {/* add a way to delete item */}
            <Item/>
            <Item/>
            <Item/>

            {/* if item on display are the user's item */}
            <button onClick={() => {history.push("/additem")}}> Add an Item </button>
        </>
        )

}

export default MyItems