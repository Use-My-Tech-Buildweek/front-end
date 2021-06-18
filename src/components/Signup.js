const Signup = () => {
    return (
        // pass a prop to specify if the submit must create a new user or update one .. (see if user id not undefined)
        // so the form can be used to signup or update profile
    <form>
        <label>
            Username
            <input name="username" type="text" placeholder="choose your username"/>
        </label>
        <label>
            email
            <input name="email" type="text" placeholder="contact email"/>
        </label>
        <label>
            Password
            <input name="password" type="text" placeholder="enter your password"/>
        </label>
        <label>
            Confirm your Password
            <input name="passwordConfirmation" type="text" placeholder="confirm your password"/>
        </label>
        <label>
            introduce yourself briefly
            <textarea name="aboutMe" type="text" placeholder="about me..."/>
        </label>
        <label>
            Profile picture
            <input name="profilePicture" type="file" accept=".jpg,.jpeg,.png" placeholder="about me..."/>
        </label>
        <button type="submit">Sign up</button>
    </form>
    )
}

export default Signup