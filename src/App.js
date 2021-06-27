import { BrowserRouter as Router, Route, Switch, withRouter } from "react-router-dom";
import React, { useEffect, useState } from 'react'
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
import { fetchItems } from './actions/itemsActions';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      items: [],
      itemList: this.props.itemList.itemList
    }
  }

  toggleVisible = () => {
    this.setState(
      this.state.visible, !this.state.visible)
  }


  componentDidMount() {
    this.props.fetchItems()

    if (localStorage.getItem('token') !== '') {
      localStorage.clear();
      this.props.userLogOut();
    }

  }
  componentDidUpdate(prevProps) {
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

  deleteAccount = (id) => {
    console.log("deleting account")

    // get user id from user logged in 
    // call: https://ptpt-use-my-tech5.herokuapp.com/api/user/:id
  }

  logout = () => {
    this.props.userLogOut();

  }
  render() {
    return (
      <Router>
        <header>
          {this.props.isLoading && <h1>Loading.....</h1>}
          <Navbar triggerModal={this.triggerModal} logOut={this.logout} />
        </header>
        <main>
          <Switch>
            <Route exact path="/">

              <Welcome itemList={this.state.itemList} triggerModal={this.triggerModal} />


            </Route>

            <Route path="/register">
              <SignupForm visible={this.state.visible} toggleVisible={this.toggleVisible} />
            </Route>

            <PrivateRoute path='/profile/user/:id' component={Profile} type='private' />

            <PrivateRoute path={`/edit-profile/:userId`}>
              <EditProfileForm triggerModal={this.triggerModal} deleteAccount={this.deleteAccount} />
            </PrivateRoute>

            <PrivateRoute path="/additem" render={NewItem} type='private' />

            <PrivateRoute path='/user-list' render={UserList} type='private' />

            <Route path="/myItems">
              <MyItems triggerModal={this.triggerModal} itemsList={this.state.items} />
            </Route>

            <Route path="/myCart">
              <MyCart triggerModal={this.triggerModal} itemsList={this.state.items} />

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
    userList: state.users.userList,
    user: state.users.user,
    itemList: state.itemList.itemList,
    item: state.items.item,
    isLoading: state.items.isLoading,
    isUserLoggedIn: state.users.isUserLoggedIn,
    token: state.users.token,
    items: state.items.items
  }
}

export default withRouter(connect(mapStateToProps, { userLogOut, fetchItems })(App))