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
                  value=""
                >
                  <option value="default" disabled>
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

            <label>
              Password
              <input
                name="password"
                type="password"
                placeholder="enter your password"
                value={this.state.user.password}
                id="password"
                onChange={this.handleChanges}
              />
            </label>
            <label>
              Confirm your Password
              <input
                name="passwordConfirmation"
                type="text"
                placeholder="confirm your password"
              />
            </label>
            <label>
              Tell everyone a little about yourself:
              <textarea
                name="bio"
                type="text"
                placeholder="About me..."
                id="bio"
                value={this.state.user.bio}
                onChange={this.handleChanges}
              />
            </label>
            <label>
              Profile picture
              <input
                name="profilePicture"
                type="file"
                accept=".jpg,.jpeg,.png"
                placeholder="Avatar"
                value={this.state.user.profileImg}
                onChange={this.fileChange}
              />
            </label>
            <button type="submit">Sign up</button>
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
