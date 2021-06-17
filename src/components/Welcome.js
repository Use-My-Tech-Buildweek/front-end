import Item from './Item'

const Welcome = () => {
    return (
        <>
            <form>
                <label>
                    I'm looking for :
                <input type='text' placeholder="I'm looking for...." />
                </label>

            </form>
            <div>
                <h2>Electronics</h2>
                <Item />
                <Item />
                <Item />
                <Item />
            </div>
            <div>
                <h2>Tools / DIY</h2>
                <Item />
                <Item />
                <Item />
                <Item />
            </div>
        </>
    )
}

export default Welcome