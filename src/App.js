import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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
import { getItems } from './actions/itemsActions';

const App = props => {
  const [visible, setVisible] = useState(false)
  // const [itemList, setItemList] = useState([])

  const toggleVisible = () => {
    setVisible(!visible)
  }

  //  setItemList(props.itemList)
  /* 
    useEffect(() => {
      props.getItems()
        .then(resp => { console.log(resp); setItemList(resp) })
        .catch(err => console.log(err))
    }, [props])
   */

  const { items, itemList, isLoading, isUserLoggedIn } = props;

  const triggerModal = (id) => {
    const modal = document.getElementById(id);
    modal.style.display = "block";
    modal.style.position = "fixed";
    modal.style.top = "10%";
    modal.style.left = "40%";
  }

  const deleteAccount = (id) => {
    console.log("deleting account")

    // get user id from user logged in 
    // call: https://ptpt-use-my-tech5.herokuapp.com/api/user/:id
  }

  const logout = () => {
    userLogOut();
  }

  return (
    <Router>
      <header>
        {isLoading && <h1>Loading.....</h1>}
        <Navbar triggerModal={triggerModal} logOut={logout} />
      </header>
      <main>
        <Switch>
          <Route exact path="/">

            <Welcome itemList={props.items} triggerModal={triggerModal} />


          </Route>

          <Route path="/register">
            <SignupForm visible={visible} toggleVisible={toggleVisible} />
          </Route>

          <PrivateRoute path='/profile/user/:id' component={Profile} type='private' />

          <PrivateRoute path={`/edit-profile/:userId`}>
            <EditProfileForm triggerModal={triggerModal} deleteAccount={deleteAccount} />
          </PrivateRoute>

          <PrivateRoute path="/additem" render={NewItem} type='private' />

          <PrivateRoute path='/user-list' render={UserList} type='private' />

          <Route path="/myItems">
            <MyItems triggerModal={triggerModal} itemsList={props.itemList} />
          </Route>

          <Route path="/myCart">
            <MyCart triggerModal={triggerModal} itemsList={props.itemList} />

          </Route>

          <Route path="/login">
            <Login />
          </Route>


        </Switch>
      </main>
    </Router>)

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
    items: state.items
  }
}

export default connect(mapStateToProps, { userLogOut, getItems })(App)