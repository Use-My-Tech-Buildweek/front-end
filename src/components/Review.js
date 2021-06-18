import userEvent from "@testing-library/user-event"

const Review = () => {
 // const path = "/profile/" + reviewer.id
    return(
        <>
        {/* reviewer name and profile picture should linked to renter's profile via /profile */}
        <Link to={path}>
            <img src='' alt="reviewer's profile picture" />
            <p>reviewer</p>
        </Link>
        <h2>Title</h2>
        <p>Review...</p>
        <h2>Rating</h2>
        <p>x.x/5</p>
        </>
    )
}


export default Review;
