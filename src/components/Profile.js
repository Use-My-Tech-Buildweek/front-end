import { useHistory, useParams } from 'react-router-dom'
import Review from './Review'

const Profile = () => {
    const history = useHistory()
    const params = useParams()

    // if params === userLoggedIn select to correct button to be displayed
    
    return(
        <>
            <div>
                <img src='' alt='profile picture' />
                <p>username</p>
                <p>email</p>
                <p>about</p>
                <p>Ratings</p>
                {/* add an edit profile button if Profile is from logged user */}
                {/* if user is viewing someone else profile the button should be used to leave a review */}
                <button onClick={() => history.push('/review')}>Leave a review</button>
                <button onClick={() => history.push('/editProfile')}>edit profile</button>
            </div>
            <div>
                <h2>Reviews</h2>
                <Review />
                <Review />
                <Review />
                <Review />
            </div>
        </>
    )
}

export default Profile