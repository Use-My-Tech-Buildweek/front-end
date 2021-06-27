//import userEvent from "@testing-library/user-event"
//import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const Review = () => {
    // const path = "/profile/" + reviewer.id
    const mockedReview = {
        rating: 4.5,
        text: "great deal, user number x was very helpful etc...",
        reviewer: {
            name: 'John',
            profile_picture: "anUrlGoesHere",
            id: 2
        }
    }

    return (
        <div>
            {/* reviewer name and profile picture should linked to renter's profile via /profile */}
            {/* <Link to='/profile/user/:id'/> */}
            <img src={mockedReview.reviewer.profile_picture} alt="reviewer picture" />
            <p>{mockedReview.reviewer.name}</p>
            <p>Rating: {mockedReview.rating}</p>
            <p>{mockedReview.text}</p>
        </div >
    )
}

const mapStateToProps = state => {
    return {
        isUserLoggedIn: state.isUserLoggedIn
    }
}

export default connect(mapStateToProps, {})(Review)
