import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { addUser, setError } from "../actions/userActions";
import M from "materialize-css";

const SignupForm = (props) => {
  let history = useHistory();
  //   const { visible, toggleVisible } = props;
  const initialFormValues = {
    username: "",
    password: "",
    role: "default",
    email: "",
    about_me: "",
    profile_picture: "",
    department: "",
    error: "",
    isFilePicked: false,
    id: Math.random(),
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
    history.push(`/profile/:${formValues.id}`); // Wasn't receiving id in props, so for now
  };

  const handlechange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    // pass a prop to specify if the submit must create a new user or update one .. (see if user id not undefined)
    // Integrate Sarah's changes (Redux)
    <div className="container">
      <div className="row">
        <form action="submit" className="col s12" onSubmit={handleSubmit}>
          <div className="row">
            <div className="input-field col s12 l6">
              <input
                required
                name="username"
                className="counter_input validate"
                minLength="2"
                maxLength="21"
                data-length="20"
                id="username"
                type="text"
                onChange={handlechange}
                value={formValues.username}
              />
              <label htmlFor="username">Username</label>
              {/* TODO: check against existing usernames for duplicate */}
              <span
                className="helper-text"
                data-error="Username must be between 2-20 characters"
                data-success="Username available"
              >
                Please choose a username
              </span>
            </div>
            <div className="input-field col s12 l6">
              <input
                required
                className="counter_input validate"
                minLength="7"
                maxLength="31"
                data-length="30"
                type="email"
                id="email"
                name="email"
                onChange={handlechange}
                value={formValues.email}
              />
              <label htmlFor="email">Email</label>
              <span
                className="helper-text"
                data-error="Please enter a valid email address"
                data-success="Email validated"
              >
                Please enter your email address
              </span>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <select
                required
                className="validate"
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
              <span
                className="helper-text"
                data-error="Please select a role from the dropdown menu"
                data-success="Welcome to the team!"
              >
                What do you do?
              </span>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <textarea
                required
                minLength="50"
                maxLength="501"
                data-length="500"
                name="about_me"
                id="about_me"
                cols="30"
                rows="10"
                className="materialize-textarea counter_input validate"
                onChange={handlechange}
                value={formValues.about_me}
              />
              <label htmlFor="about_me">Introduce Yourself</label>
              <span className="helper-text">
                What's your favorite tech stack? Semicolons or no?
              </span>
            </div>
          </div>

          <div className="row">
            {/* I got the upload working, you can pick a file on your computer or phone. */}
            <div className="file-field input-field col s12">
              <div className="btn left">
                <input
                  type="file"
                  id="profile_picture"
                  name="profile_picture"
                  accept="image/png, image/jpeg"
                  onChange={handlechange}
                  value={formValues.profile_picture}
                />
                <label htmlFor="profile_picture" className="active white-text">
                  Upload a profile picture
                </label>
              </div>
              {formValues.profile_picture === "" ? (
                <></>
              ) : (
                <div className="file-path-wrapper">
                  {/* TODO: handle cancel/modal closing during file upload */}
                  <input
                    type="text"
                    className="file-path validate valid"
                    placeholder={formValues.profile_picture}
                    disabled
                  />
                </div>
              )}
              <button
                type="submit"
                className="btn waves-effect waves-light right"
                name="profile_picture"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.users,
    newUser: state.newUser,
    error: state.error,
    sendApiCall: state.sendApiCall,
  };
};

export default connect(mapStateToProps, { setError, addUser })(SignupForm);
