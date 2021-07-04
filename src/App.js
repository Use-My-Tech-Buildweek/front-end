import { BrowserRouter as Router, Route, Switch, withRouter } from "react-router-dom";
import React from 'react'
import { connect } from 'react-redux'

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
    super(props)
    this.state = {
      visible: false,
      items: [],
      itemList: this.props.itemList
    }
  }

  // Toggle modal visibility
  toggleVisible = () => {
    this.setState(
      this.state.visible, !this.state.visible)
  }

  componentDidMount() {
    // Keep user logged in if token is present in local storage
    if (localStorage.getItem('token') !== '') {
      localStorage.clear();
    }

  }
  componentDidUpdate(prevProps) {
    // Keeps itemList fresh
    if (prevProps.itemList.length !== this.props.itemList.length) {
      this.setState({
        ...this.state,
        items: this.props.itemList.itemList
      })
    }
  }

  triggerModal = (id) => {
    const modal = document.getElementById(id);
    modal.style.display = "block";
    modal.style.position = "fixed";
    modal.style.top = "10%";
    modal.style.left = "40%";
  }

  //Delete user account
  deleteAccount = (id) => {
    console.log("deleting account")

    // get user id from user logged in 
    // call: https://ptpt-use-my-tech5.herokuapp.com/api/user/:id
  }

  logout = () => {
    this.props.userLogOut();
    this.props.history.push('/login')
  }

  render() {
    return (
      <Router>
        <header>
          {this.props.isLoading && <h1>Loading.....</h1>}
          {/* Visible on every page*/}
          <Navbar triggerModal={this.triggerModal} logOut={this.logout} />
        </header>
        <main>
          <Switch>
            {/* Landing page*/}
            <Route exact path="/">
              <Welcome itemList={this.state.itemList} triggerModal={this.triggerModal} />
            </Route>

            {/* New account registration */}
            <Route path="/register">
              <SignupForm visible={this.state.visible} toggleVisible={this.toggleVisible} />
            </Route>

            {/* User profile*/}
            <PrivateRoute path='/profile/user/:id' user={this.props.user} component={Profile} type='private' />

            {/* Edit profile form*/}
            <PrivateRoute path={`/edit-profile/:userId`}>
              <EditProfileForm history={this.props.history} triggerModal={this.triggerModal} deleteAccount={this.deleteAccount} />
            </PrivateRoute>

            {/* Add new item form*/}
            <PrivateRoute path="/user/:id/additem" component={NewItem} type='private' />

            {/* Upload images for profile or new items*/}
            {/*             <PrivateRoute path='/user/:id/avatar' component={FileUploader} user={this.props.user} isUserLoggedIn={this.props.isUserLoggedIn} />*/}

            {/* Display all user profiles*/}
            <PrivateRoute path='/user-list' render={UserList} type='private' />

            {/* Display all items for logged in user*/}
            <Route path="/myItems">
              <MyItems triggerModal={this.triggerModal} itemsList={this.state.items} />
            </Route>

            {/* Display items currently in cart*/}
            <Route path="/myCart">
              <MyCart triggerModal={this.triggerModal} itemsList={this.state.items} />
            </Route>

            {/* Log in form*/}
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
    userList: state.lists.userList,
    user: state.users.user,
    itemList: state.lists.itemList,
    item: state.items.item,
    isLoading: state.items.isLoading,
    isUserLoggedIn: state.users.isUserLoggedIn,
    token: state.users.token,

  }
}

export default withRouter(connect(mapStateToProps, { userLogOut })(App))