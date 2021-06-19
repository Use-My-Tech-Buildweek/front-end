import React, { useState, useEffect } from "react";
import M from "materialize-css";

const Signup = () => {
  const initialFormValues = {
    username: "",
    role: "",
    email: "",
    password: "",
    pw_validate: "",
    about_me: "",
    profilePicture: "",
  };
  const [formValues, setFormValues] = useState(initialFormValues);

  useEffect(() => {
    const elems = document.querySelectorAll("select");
    M.FormSelect.init(elems);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: submit form values to backend and reset form
  };

  const handlechange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    console.log(name, value);
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    // pass a prop to specify if the submit must create a new user or update one .. (see if user id not undefined)
    <div className="row">
      <form action="submit" className="col s12" onSubmit={handleSubmit}>
        <div className="row">
          <div className="input-field col s6">
            <input
              name="username"
              id="username"
              type="text"
              onChange={handlechange}
              value={formValues.username}
            />
            <label htmlFor="username">Username</label>
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
              <option value="" disabled default>
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
          <div className="input-field col s6">
            <input
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
          <div className="input-field col s6">
            <input
              type="password"
              name="password"
              id="password"
              onChange={handlechange}
              value={formValues.password}
            />
            <label htmlFor="password"></label>
          </div>
          <div className="input-field col s6">
            <input
              type="password"
              name="pw_validate"
              id="pw_validate"
              onChange={handlechange}
              value={formValues.pw_validate}
            />
            <label htmlFor="pw_verify"></label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <textarea
              name="about_me"
              id="about_me"
              cols="30"
              rows="10"
              className="materialize-textarea"
              onChange={handlechange}
              value={formValues.aboutMe}
            />
            <label htmlFor="about_me">Introduce Yourself</label>
          </div>
        </div>
        <div className="row">
          <div className="file-field input-field col s12">
            <div className="btn">
              <span>Profile Picture</span>
              <input
                type="file"
                name="profilePicture"
                onChange={handlechange}
                value={formValues.profilePicture}
              />
            </div>
            <div className="file-path-wrapper">
              <input
                className="file-path validate"
                name="pw_validate"
                type="text"
                onChange={handlechange}
                value={formValues.pw_validate}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col s6">
            <button type="submit" className="btn btn-waves-effect">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
