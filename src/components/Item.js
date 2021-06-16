const Item = () => {
    // const { pictures, description, price, user } = item;

    return(
        <>
        <div>
            <p>item.name</p>
            <p>user.ratings</p>
        </div>
        <div>
            <p>picture1</p>
            <p>picture2</p>
            <p>....</p>
            {/* {pictures.map((pic) => {
                return(
                    <img src={pic.src} alt={pic.alt} />
                )
            })} */}
        </div>
        <div>
            <h2>description</h2>
            <p>this is a very good item , lorem ipsum etc etc...</p>
        </div>
        <div>
            <p>price $/day</p>
        </div>
        <button> Rent</button>
        </>
    )


}

export default Item