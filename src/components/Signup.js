import React, { useState, useEffect } from "react";
import M from "materialize-css";

const Signup = () => {
  const initialFormValues = {
    username: "",
    role: "",
    email: "",
    password: "",
    aboutMe: "",
    profilePicture: null,
  };
  const [formValues, setFormValues] = useState(initialFormValues);

  useEffect(() => {
    const elems = document.querySelectorAll("select");
    M.FormSelect.init(elems);
  }, []);

  return (
    // pass a prop to specify if the submit must create a new user or update one .. (see if user id not undefined)
    <div className="row">
      <form action="submit" className="col s12">
        <div className="row">
          <div className="input-field col s6">
            <input name="username" id="username" type="text" />
            <label htmlFor="username">Username</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <select name="role" id="role">
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
            <input type="email" id="email" name="email" />
            <label htmlFor="email">Email</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s6">
            <input type="password" name="password" id="password" />
            <label htmlFor="password"></label>
          </div>
          <div className="input-field col s6">
            <input type="password" name="pw_verify" id="pw_verify" />
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
            ></textarea>
            <label htmlFor="about_me">Introduce Yourself</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s6">
            <input name="profilePicture" type="file" accept=".jpg,.jpeg,.png" />
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
    // <form>

    //     <label>
    //         Username
    //         <input name="username" type="text" placeholder="choose your username"/>
    //     </label>
    //     <label>
    //         Role
    //         <select name="role">
    //             <option value="" selected disabled hidden>== option ==</option>
    //             <option value="Renter">Renter</option>
    //             <option value="Client">Client</option>
    //         </select>
    //     </label>
    //     <label>
    //         email
    //         <input name="email" type="text" placeholder="contact email"/>
    //     </label>
    //     <label>
    //         Password
    //         <input name="password" type="text" placeholder="enter your password"/>
    //     </label>
    //     <label>
    //         Confirm your Password
    //         <input name="passwordConfirmation" type="text" placeholder="confirm your password"/>
    //     </label>
    //     <label>
    //         introduce yourself briefly
    //         <textarea name="aboutMe" type="text" placeholder="about me..."/>
    //     </label>
    //     <label>
    //         Profile picture
    //         <input name="profilePicture" type="file" accept=".jpg,.jpeg,.png" placeholder="about me..."/>
    //     </label>
    //     <button type="input">Sign up</button>

    // </form>
  );
};

export default Signup;
