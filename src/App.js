import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
//import { useState } from 'react'
import './App.css';

import Login from "./components/Login";
import Signup from "./components/SignupForm";
import Welcome from "./components/Welcome";
import MyItems from "./components/MyItems";
import NewItem from "./components/NewItem";
import Navbar from './components/Navbar'

function App() {
  return (
    <Router>
      <header>
        <Navbar />
      </header>

      <main>
        <Switch>
          <Route path="/myprofile">
            <Signup />
          </Route>

          <Route path="/editProfile">
            <Signup />
          </Route>

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
      </main>
    </Router>
  );
}

export default App;
