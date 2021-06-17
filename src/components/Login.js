import { Link } from 'react-router-dom'

// todo: find how to create login ( check with the other if they recon a library)
const Login = () => {
    return(
        <form>
            <label>
                Username
                <input name="username" type="text" placeholder="enter your username"/>
            </label>
            <label>
                Password
                <input name="password" type="text" placeholder="enter your password"/>
            </label>
            <button type="submit">Login</button>
            {/* add a keep me logged in checkbox? */}
            <p>Don't have an account?</p>
            <Link to="/editProfile">Sign up!</Link>
            <p>Forgot your password?</p>
            {/* handle password forgotten */}
        </form>
    )

}

export default Login