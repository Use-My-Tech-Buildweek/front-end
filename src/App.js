import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useState, useEffect } from 'react'
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
import { fetchUsers } from './actions/userActions'


const App = props => {
  const [visible, setVisible] = useState(false)

  function toggleVisible() {
    setVisible(!visible)
  }

  useEffect(() => {
    fetchUsers();
  }, []);


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

          <PrivateRoute path='/profile/:userId' component={Profile} />

          <PrivateRoute path={`/edit-profile/:userId`} component={EditProfileForm} />

          <PrivateRoute path="/additem" component={NewItem} />

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
    users: state.users,
    user: state.user,
  }
}
export default connect(mapStateToProps, {})(App);
