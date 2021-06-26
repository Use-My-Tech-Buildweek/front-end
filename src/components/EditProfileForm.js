import React, { Component } from "react";
import { getProfile, updateProfile } from "../actions/userActions";
import { connect } from "react-redux";

import M from "materialize-css";

class EditProfileForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: "",
        password: "",
        email: "",
        bio: "",
        profileImg: "",
        accountType: "",
      },
      selectedFile: null,
    };
  }
  componentDidMount = () => {
    this.props.getProfile(this.props.match.params.id);
    const counters = document.querySelectorAll(".counter_input");
    M.CharacterCounter.init(counters);
    const elems = document.querySelectorAll("select");
    M.FormSelect.init(elems);
  };

  handleSubmit = (e) => {
    e.persist();
    this.props.updateProfile(this.state.user);
  };

  fileChange = (e) => {
    this.setState({ selectedFile: e.target.files[0] });
  };

  onFileUpload = () => {
    const formData = new FormData();
    formData.append(
      "file",
      this.state.selectedFile,
      this.state.selectedFile.name
    );
    this.props.uploadFile(this.state.selectedFile);
  };

  handleChanges = (e) => {
    e.preventDefault();
    let tempUser = { ...this.state.user, [e.target.name]: e.target.value };
    this.setState({ user: tempUser });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <form onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="input-field col s12">
                <select
                  required
                  className="validate"
                  name="role"
                  id="role"
                  onChange={this.handlechanges}
                >
                  <option disabled defaultValue>
                    Choose your role
                  </option>
                  <option value="renter">Renter</option>
                  <option value="client">Owner</option>
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
                  onChange={this.handleChanges}
                  value={this.state.user.username}
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
                  onChange={this.handleChanges}
                  value={this.state.user.email}
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
              <div className="col s12">
                <div className="input-field col s6">
                  <i className="material-icons prefix">account_circle</i>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    className="validate"
                    onChange={this.handleChanges}
                    value={this.state.password}
                    required
                  />
                  <label htmlFor="password">enter password</label>
                </div>
                <div className="input-field col s6">
                  <i className="material-icons prefix">lock</i>
                  <input
                    id="password_verify"
                    name="password_verify"
                    type="password"
                    className="validate disabled"
                    onChange={this.handleChanges}
                    value={this.state.password}
                  />
                  <label htmlFor="password_verify">verify password</label>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <i className="material-icons prefix">mode_edit</i>
                <textarea
                  required
                  minLength="50"
                  maxLength="501"
                  data-length="500"
                  name="bio"
                  id="bio"
                  cols="30"
                  rows="10"
                  className="materialize-textarea counter_input validate"
                  onChange={this.handleChanges}
                  value={this.state.user.bio}
                />
                <label htmlFor="bio">
                  Tell everyone a little about yourself
                </label>
                <span className="helper-text">About me...</span>
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
                    onChange={this.fileChange}
                    value={this.state.user.profileImg}
                  />
                  <label
                    htmlFor="profile_picture"
                    className="active white-text"
                  >
                    Upload a profile picture
                  </label>
                </div>
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
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapStateToProps, { getProfile, updateProfile })(
  EditProfileForm
);
