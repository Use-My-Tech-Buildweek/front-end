import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {useState} from 'react'
import "./App.css";

import Login from "./components/Login";
import Signup from "./components/Signup";
import Welcome from "./components/Welcome";
import MyItems from "./components/MyItems";
import NewItem from "./components/NewItem";
import Navbar from "./components/NavBar";

function App() {
  // default variables
  /**
  const defaultUser = {
    username: '',
    email: '',
    role: '',
    aboutMe: '',
    profilePicture: '',
    rating: [],
  } 
  */

  const [ visible, setVisible ] = useState(false)

  function toggleVisible(){
    setVisible(!visible)
  }

  return (
    <Router>
      <header>
        <Navbar />
      </header>

      <main>
        <Switch>
          <Route path="/myprofile">
            <Signup 
              visible={visible} 
              toggleVisible={toggleVisible}/>
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
