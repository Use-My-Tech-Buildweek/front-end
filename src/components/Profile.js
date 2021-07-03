
import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux'
import { titleStyle, profilePicWrapperStyle } from './styles/styles.js'

import { getProfile, getMyItems } from '../actions/userActions'
import defaultProfile from '../images/defaultProfile.png'
import Review from "./Review";
import MyItems from './MyItems'

const Profile = props => {

  const history = useHistory();


  useEffect(() => {
    if (props.isLoggedIn) {
      props.getMyItems(props.user.id)
    }
  }, [props])

  const startEditProfile = (e, id) => {
    history.push(`/edit-profile/:${props.user.id}`)
  }



  return (
    <>
      <div>
        <h2 style={titleStyle}>{props.user.username}</h2>
        <h3 style={titleStyle}>{props.user.department}</h3>
        <img style={profilePicWrapperStyle} src={props.user.profile_picture || defaultProfile} alt="" />
        <p>{props.user.username}</p>


        {props.user.department === 'renter' ? (<h3>My Recent Rentals</h3>)
          : (<div><h3>Items I Own</h3><MyItems /></div>)}
        <button onClick={startEditProfile}>
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

export default connect(mapStateToProps, { getProfile, getMyItems })(Profile)

