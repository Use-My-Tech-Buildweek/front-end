//import userEvent from "@testing-library/user-event"
//import { Link } from 'react-router-dom'

const Review = () => {
    // const path = "/profile/" + reviewer.id
    return (
        <div>
            {/* reviewer name and profile picture should linked to renter's profile via /profile */}
            {/* <Link to={path}>*/}
            <img src='' alt="reviewer" />
            <p>reviewer</p>

            <h2>Title</h2>
            <p>Review...</p>
            <h2>Rating</h2>
            <p>x.x/5</p>
        </div >
    )
}


export default Review;
