import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import "./App.css";

import PrivateRoute from './components/PrivateRoute'
import Login from "./components/Login";
import SignupForm from "./components/SignupForm";
import Welcome from "./components/Welcome"
import MyItems from "./components/MyItems";
import NewItem from "./components/NewItem";
import Navbar from './components/Navbar'
import Profile from './components/Profile'
import EditProfileForm from './components/EditProfileForm'
import UserList from './components/UserList'

import MyCart from './components/MyCart'


import { userLogOut } from './actions/userActions'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      itemList: this.props.itemList,
    }
  }


  toggleVisible = () => {
    this.setState(
      ...this.state,
      this.state.visible, !this.state.visible
    )
  }

  triggerModal(id) {
    const modal = document.getElementById(id);
    modal.style.display = "block";
    modal.style.position = "fixed";
    modal.style.top = "10%";
    modal.style.left = "40%";
  }

  deleteAccount = (id) => {
    console.log("deleting account")

    // get user id from user logged in 
    // call: https://ptpt-use-my-tech5.herokuapp.com/api/user/:id
  }

  logout = () => {
    userLogOut();
  }

  render() {

    return (
      <Router>
        <header>
          <Navbar triggerModal={this.triggerModal} logOut={this.logout} />
        </header>
        <main>
          <Switch>
            <Route exact path="/">

              <Welcome items={this.state.itemList} triggerModal={this.state.triggerModal} />


            </Route>

            <Route path="/register">
              <SignupForm visible={this.state.visible}
                toggleVisible={this.toggleVisible} />
            </Route>

            <PrivateRoute path='/profile/user/:id' component={Profile} type='private' />

            <PrivateRoute path={`/edit-profile/:userId`}>
              <EditProfileForm triggerModal={this.triggerModal} deleteAccount={this.deleteAccount} />
            </PrivateRoute>

            <PrivateRoute path="/additem" render={NewItem} type='private' />

            <PrivateRoute path='/user-list' render={UserList} type='private' />

            <Route path="/myItems">
              <MyItems triggerModal={this.triggerModal} itemsList={this.state.itemList} />
            </Route>

            <Route path="/myCart">
              <MyCart triggerModal={this.triggerModal} itemsList={this.state.itemList} />

            </Route>

            <Route path="/login">
              <Login />
            </Route>


          </Switch>
        </main>
      </Router>)

  }
}


const mapStateToProps = state => {
  return {
    userList: state.userList,
    user: state.user,
    itemList: state.itemList,
    item: state.item,
    isLoading: state.isLoading,
    isUserLoggedIn: state.isUserLoggedIn,
    token: state.token,
  }
}

export default connect(mapStateToProps, { userLogOut })(App)