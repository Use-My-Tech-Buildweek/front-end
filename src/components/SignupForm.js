import React, { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { connect } from "react-redux";
import M from "materialize-css";
// eslint-disable-next-line no-unused-vars
import { addUser, setError } from "../actions/userActions";
import { useHistory } from "react-router-dom";
import { searchWrapperStyle } from "./styles/styles";

const SignupForm = (props) => {
  let history = useHistory();
  //   const { visible, toggleVisible } = props;
  const initialFormValues = {
    username: "",
    password: "",
    role: "default",
    email: "",
    pw_validate: "",
    about_me: "",
    profile_picture: "",
    department: "",
    error: "",
    isFilePicked: false,
    id: "",
  };

  const [formValues, setFormValues] = useState(initialFormValues);

  useEffect(() => {
    const elems = document.querySelectorAll("select");
    M.FormSelect.init(elems);

    // TODO: add stronger checks, such as file type and size
    if (
      formValues.profile_picture !== "" &&
      formValues.isFilePicked === false
    ) {
      setFormValues({ ...formValues, isFilePicked: true });
    }
  }, [formValues]);

  useEffect(() => {
    const counters = document.querySelectorAll(".counter_input");
    M.CharacterCounter.init(counters);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      "submit add new user button clicked, calling addUser",
      formValues
    );
    // Submit form values to backend and reset form
    addUser(formValues); //should be sending identical data as "this.props.addUser(this.state.newUser)"
    // Clear form
    setFormValues(initialFormValues);
    // Programmatic redirect to profile page
    history.push(`/profile/:${formValues.id}`);
  };

  const handlechange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    console.log(name, value);
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    // pass a prop to specify if the submit must create a new user or update one .. (see if user id not undefined)
    // TODO: Add text counters
    // TODO: Add field validation
    // Integrate Sarah's changes (Redux)
    <div className="container">
      <div className="row">
        <form action="submit" className="col s12" onSubmit={handleSubmit}>
          <div className="row">
            <div className="input-field col s6">
              <input
                name="username"
                className="counter_input"
                maxLength="21"
                data-length="20"
                id="username"
                type="text"
                onChange={handlechange}
                value={formValues.username}
              />
              <label htmlFor="username">Username</label>
            </div>
            <div className="input-field col s6">
              <input
                className="counter_input"
                maxLength="31"
                data-length="30"
                type="email"
                id="email"
                name="email"
                onChange={handlechange}
                value={formValues.email}
              />
              <label htmlFor="email">Email</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <select
                name="role"
                id="role"
                onChange={handlechange}
                value={formValues.role}
              >
                <option name="role" value="default" disabled>
                  Choose your role
                </option>
                <option name="role" value="renter">
                  Renter
                </option>
                <option name="role" value="client">
                  Client
                </option>
              </select>
              <label htmlFor="role">Role</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <textarea
                maxLength="301"
                data-length="300"
                name="about_me"
                id="about_me"
                cols="30"
                rows="10"
                className="materialize-textarea counter_input"
                onChange={handlechange}
                value={formValues.about_me}
              />
              <label htmlFor="about_me">Introduce Yourself</label>
            </div>
          </div>

          <div className="row">
            {/* I got the upload working, you can pick a file on your computer and it shows a fakepath. */}
            <div className="file-field input-field col s12">
              <div className="btn">
                <label htmlFor="profile_picture" className="active white-text">
                  Profile Picture
                </label>
                <input
                  type="file"
                  id="profile_picture"
                  name="profile_picture"
                  accept="image/png, image/jpeg"
                  onChange={handlechange}
                  value={formValues.profile_picture}
                />
              </div>
              <div className="file-path-wrapper">
                <input
                  type="text"
                  className="file-path counter_input"
                  value={formValues.profile_picture}
                  onChange={handlechange}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div
              className="input-field col s6 offset-s3"
              style={searchWrapperStyle}
            >
              <input
                type="submit"
                value="submit"
                className="white-text waves-effect waves-light"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

// const mapStateToProps = (user) => {
//   return {
//     users: users,
//     newUser: formValues,
//     error: error,
//     sendApiCall: sendApiCall,
//   };
// };

// export default connect(mapStateToProps, { setError, addUser })(SignupForm);
export default SignupForm;
