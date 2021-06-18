const Signup = ({ toggleVisible, visible }) => {
 return (
    // pass a prop to specify if the submit must create a new user or update one .. (see if user id not undefined)
    <form>
        <label>
            Username
            <input 
                name="username" 
                type="text" 
                placeholder="choose your username"
            />
        </label>
        <label>
            Role
            <select name="role">
                <option value="" selected disabled hidden>== option ==</option>
                <option value="Renter">Renter</option>
                <option value="Client">Client</option>
            </select>
        </label>
        <label>
            email
            <input 
                name="email" 
                type="email" 
                placeholder="contact email"
            />
        </label>
        <label>
            Password
            <input 
                name="password" 
                type={visible?"text": "password"}
                placeholder="enter your password"
            />
        </label>
        <label>
            Confirm your Password
            <input 
                name="passwordConfirmation" 
                type={visible?"text": "password"}
                placeholder="confirm your password"
            />
        </label>
        <button 
            type="button" 
            onClick={() => toggleVisible() }>visible</button>
        <label>
            introduce yourself briefly
            <textarea 
                name="aboutMe" 
                type="text" 
                placeholder="about me..." 
                maxlength="500" 
            />
        </label>
        <label>
            Profile picture
            <input 
                name="profilePicture" 
                type="file" 
                accept=".jpg,.jpeg,.png" 
                placeholder="about me..."
            />
        </label>
        <button type="input">Sign up</button>

    </form>
  );
};

export default Signup;
