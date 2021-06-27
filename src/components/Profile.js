
import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux'
import { getProfile } from '../actions/userActions'
import defaultProfile from '../images/defaultProfile.png'

import Review from "./Review";

const Profile = props => {

  const history = useHistory();

  return (
    <>
      <div>
        <h1>{props.user.username}</h1>
        <img src={props.user.profile_picture || defaultProfile} alt="" />
        <p>{props.user.username}</p>
        <p>{props.user.name}</p>

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
    user: state.users.user,
    isUserLoggedIn: state.users.isUserLoggedIn
  }
}

export default connect(mapStateToProps, { getProfile })(Profile)

