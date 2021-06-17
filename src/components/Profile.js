import React from 'react';
import { useHistory } from "react-router-dom";
import Review from "./Review";

const Profile = () => {
  const history = useHistory();

  return (
    <>
      <div>
        {/* <img src="" alt="profile picture" /> */}
        <p>username</p>
        <p>email</p>
        <p>about</p>
        <p>Ratings</p>
        {/* add an edit profile button if Profile is from logged user */}
        <button onClick={() => history.push("/editProfile")}>
          edit profile
        </button>
      </div>
      <div>
        <h2>Reviews</h2>
        <Review />
        <Review />
        <Review />
        <Review />
      </div>
    </>
  );
};

export default Profile;