import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useState } from 'react'
import { connect } from 'react-redux'


import "./App.css";

import PrivateRoute from './components/PrivateRoute'
import Login from "./components/Login";
import SignupForm from "./components/SignupForm";
import Welcome from "./components/Welcome"
import MyItems from "./components/MyItems";
//import Items from './components/Items'
import NewItem from "./components/NewItem";
import Navbar from './components/Navbar'
import Profile from './components/Profile'
import EditProfileForm from './components/EditProfileForm'
//import Users from './components/User'
//import { userLogOut } from './actions/userActions'

const App = props => {
  const [visible, setVisible] = useState(false)

  function toggleVisible() {
    setVisible(!visible)
  }


  // const logout = () => {
  //   userLogOut();
  // }

  return (
    <Router>
      <header>
        <Navbar />
      </header>
      <main>
        <Switch>
          <Route exact path="/">
            <Welcome />
          </Route>

          <Route path="/register">
            <SignupForm visible={visible}
              toggleVisible={toggleVisible} />
          </Route>

          <PrivateRoute path='/profile/user/:id' render={Profile} type='private' />

          <PrivateRoute path={`/edit-profile/:id}`} render={EditProfileForm} type='private' />

          <PrivateRoute path="/additem" render={NewItem} type='private' />



          <Route path="/items">
            <MyItems />
          </Route>

          <Route path="/login">
            <Login />
          </Route>


        </Switch>
      </main>
    </Router>
  );
}
const mapStateToProps = state => {
  return {
    user: state.user,

  }
}
export default connect(mapStateToProps, {})(App)