import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import Login from "./components/Login";
import Signup from "./components/Signup";
import Welcome from "./components/Welcome";
import MyItems from "./components/MyItems";
import NewItem from "./components/NewItem";
import Navbar from "./components/Navbar";

function App() {
  // default variables
  /**
  const defaultUser = {
    username: '',
    email: '',
    rating: [],
  } 
  */

  return (
    <Router>
      <header>
        {/* Reusable Navbar that can be changed dynamically using state or route info */}
        <Navbar
          links={[
            { text: "Home", route: "/", classname: "left-align" },
            { text: "My Items", route: "/items", classname: "left-align" },
            { text: "Log In", route: "/login", classname: "right-align" },
          ]}
        />
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
