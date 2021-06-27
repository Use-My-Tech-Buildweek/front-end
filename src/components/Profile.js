
import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux'

import { getProfile, getMyItems } from '../actions/userActions'
import defaultProfile from '../images/defaultProfile.png'
import Review from "./Review";
import MyItems from './MyItems'

const Profile = props => {

  const history = useHistory();

  const loadMyItems = id => {
    getMyItems(id);
  }

  return (
    <>
      <div>
        <h2>{props.user.username}</h2>
        <h3>{props.user.department}</h3>
        <img src={props.user.profile_picture || defaultProfile} alt="" />
        <p>{props.user.username}</p>


        {props.user.department === 'renter' ? (<h3>My Recent Rentals</h3>)
          : (<div><h3>Items I Own</h3><MyItems /></div>)}
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

