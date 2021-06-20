import { BrowserRouter as Router, Route, Switch, useParams } from "react-router-dom";
import { useState } from 'react'
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



function App() {
  const [visible, setVisible] = useState(false)

  function toggleVisible() {
    setVisible(!visible)
  }



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

export default App;
