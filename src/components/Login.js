import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { loginUser, setError } from "../actions/userActions";
import { buttonStyle } from "./styles/styles";

class Login extends React.Component {
  constructor(props) {
    super(props);

    // set initial form values
    this.state = {
      credentials: {
        username: "",
        password: "",
      },
    };

    // change handler
    this.handleChanges = (e) => {
      this.setState({
        credentials: {
          ...this.state.credentials,
          [e.target.id]: e.target.value,
        },
      });
    };

    // onSubmit handler
    this.login = (e) => {
      e.preventDefault();
      console.log(
        "Login says: submit button clicked, calling loginUser",
        this.state.credentials
      );
      this.props.loginUser(this.state.credentials);
    };

    //error message styling
    this.errorStyle = {
      color: "red",
      fontWeight: "bold",
      fontSize: "36px",
    };
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col s12 m8 offset-m2">
            <form onSubmit={this.login} className="col s12">
              <div className="row">
                <div className="input-field col s12">
                  <input
                    name="username"
                    id="username"
                    type="text"
                    value={this.state.credentials.username}
                    onChange={this.handleChanges}
                  />
                  <label htmlFor="username">Username</label>
                </div>
              </div>

              <div className="row">
                <div className="input-field col s12">
                  <input
                    name="password"
                    type="password"
                    id="password"
                    onChange={this.handleChanges}
                    value={this.state.credentials.password}
                  />
                  <label htmlFor="password">Password</label>
                </div>
              </div>

              <div className="row">
                <div className="input-field col s6">
                  <button type="submit" className="btn waves-effect-light" style={buttonStyle} >
                    Login
                  </button>
                </div>
                <div className="input-field col s6">
                  <label htmlFor="signup" style={{position: "absolute", top: "-2.5em", color: "gray"}} >Don't have an account?</label>
                  <button type="button" id="signup" className="btn waves-effect-light" style={buttonStyle} >
                    <span className="valign-wrapper">
                      <Link to="/register">Sign up!</Link>
                    </span>
                  </button>
                </div>
              </div>
              <div className="row">
                <p
                  className="right"
                  style={{
                    textDecoration: "underline",
                    color: "#007AAF",
                    cursor: "pointer",
                  }}
                >
                  Forgot your password?
                </p>
              </div>

              {/* add a keep me logged in checkbox? */}

              {/* handle password forgotten */}

              {this.props.loading ? (
                <p>Loading...</p>
              ) : (
                <div>
                  {this.props.errorMessages && (
                    <div>
                      <p style={this.errorStyle}>{this.props.errorMessages}</p>
                    </div>
                  )}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    );
  }
}
//connecting global state to props
const mapStateToProps = (state) => {
  return {
    credentials: state.credentials,
    errorMessages: state.errorMessages,
    loading: state.loading,
  };
};

export default connect(mapStateToProps, { loginUser, setError })(Login);
