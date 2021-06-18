const Signup = () => {
    return (
        // pass a prop to specify if the submit must create a new user or update one .. (see if user id not undefined)
    <form>
        <label>
            Username
            <input name="username" type="text" placeholder="choose your username"/>
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
        <button type="input">Sign up</button>
    </form>
    )
}

export default Signup