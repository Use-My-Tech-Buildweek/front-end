
import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux'
import { getProfile } from '../actions/userActions'
import defaultProfile from '../images/defaultProfile.png'

import Review from "./Review";

const Profile = props => {

  const history = useHistory();

  // loads the profile matching userId when the id changes 
  useEffect(() => {
    getProfile(props.userId)
  }, [props.userId])

  return (
    <>
      <div>
        <img src={ props.user.profile_picture || defaultProfile} alt="profile picture" />
        <p>{props.user.username}</p>
        <p>{props.user.name}</p>
        <p>{props.user.bio}</p>
        <p>{props.user.email}</p>
        <p>{props.user.ratings}</p>

        <button onClick={() => history.push(`/edit-profile/:${props.userId}`)}>
          Edit Profile
        </button>
      </div>
      <div>
        {/* TODO: get the list of reviews (from prop.user?) */}
        <h2>Reviews</h2>
        <Review />
        <Review />
        <Review />
        <Review />
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return {
    user: {
      username: state.username,
      email: state.email,
      userId: state.userId

    }
  }
}

export default connect(mapStateToProps, { getProfile })(Profile)

