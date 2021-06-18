import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
//import { useState } from 'react'
import './App.css';

import Login from './components/Login'
import SignupForm from './components/SignupForm'
import Welcome from './components/Welcome'
import MyItems from './components/MyItems'
import NewItem from './components/NewItem'




function App() {

  // // default variables
  // const defaultUser = {
  //   username: '',
  //   email: '',
  //   rating: [],
  // }

  return (
    <Router>
      {/* header section */}
      <div>
        <Link to='/'>Home</Link>
        <Link to='/items'>My Items</Link>
        <Link to='/login'>Login</Link>
        {/* once user loggedin login should link to my profile */}
      </div>
      {/* main section */}
      <Switch>
        <Route path="/myprofile">
          <SignupForm />
        </Route>
        { /* <Route path="/editProfile">
  <SignupForm /> 
        </Route>*/}
        <Route path="/additem">
          <NewItem />
        </Route>
        <Route path="/items">
          <MyItems />
        </Route>
        <Route path="/login">
          <Login />
        </Route>

        <Route path="/">
          <Welcome />
        </Route>
      </Switch>
    </Router >
  );
}

export default App;
