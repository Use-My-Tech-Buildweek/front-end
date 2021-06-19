import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';

import PrivateRoute from './components/PrivateRoute'
import Login from "./components/Login";
import SignupForm from "./components/SignupForm";
import Welcome from "./components/Welcome";
//import MyItems from "./components/MyItems";
import Items from './components/Items'
import NewItem from "./components/NewItem";
import Navbar from './components/Navbar'
import Profile from './components/Profile'
import EditProfileForm from './components/EditProfileForm'

function App() {
  return (
    <Router>
      <header>
        <Navbar />
      </header>
      <Switch>

        <Route path="/register">
          <SignupForm />
        </Route>

        <PrivateRoute path='/profile' component={Profile} />

        <PrivateRoute path="/edit-profile" component={EditProfileForm} />

        <PrivateRoute path="/additem" component={NewItem} />

        <Route path="/items">
          <Items />
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/">
          <Welcome />
        </Route>
      </Switch>
    </Router >
  );
}

export default App;
