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

  // get the items for renter
  //mock an item list 
  const mockItemList = [
    { id: 1,
      description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quando enim Socrates, qui parens philosophiae iure dici potest, quicquam taleSed nimis multa. Sint ista Graecorum; Nobis aliter videtur, recte secusne, postea; Quae diligentissime contra Aristonem dicuntur a Chryippo. Duo Reges: constructio interrete.",
      pictures: [],
      price: 23, 
      user: "userid", 
      title: "Cheap Lorem ipsum dolor !!",
      name: "ipsum dolo"
     },
     { id: 2,
      description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quando enim Socrates, qui parens philosophiae iure dici potest, quicquam taleSed nimis multa. Sint ista Graecorum; Nobis aliter videtur, recte secusne, postea; Quae diligentissime contra Aristonem dicuntur a Chryippo. Duo Reges: constructio interrete.",
      pictures: [],
      price: 35, 
      user: "userid", 
      title: "Amazing Lorem ipsum dolor !!",
      name: "Another ipsum dolo"
     },
     { id: 3,
      description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quando enim Socrates, qui parens philosophiae iure dici potest, quicquam taleSed nimis multa. Sint ista Graecorum; Nobis aliter videtur, recte secusne, postea; Quae diligentissime contra Aristonem dicuntur a Chryippo. Duo Reges: constructio interrete.",
      pictures: [],
      price: 24, 
      user: "userid", 
      title: "Amazing Lorem ipsum dolor !!",
      name: "Computer"
     },
     { id: 4,
      description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quando enim Socrates, qui parens philosophiae iure dici potest, quicquam taleSed nimis multa. Sint ista Graecorum; Nobis aliter videtur, recte secusne, postea; Quae diligentissime contra Aristonem dicuntur a Chryippo. Duo Reges: constructio interrete.",
      pictures: [],
      price: 60, 
      user: "userid", 
      title: "Amazing Drone!!",
      name: "Drone"
     }
  ]

  return (
    <Router>
      <header>
        <Navbar />
      </header>
      <main>
        <Switch>
          <Route exact path="/">
            <Welcome items={mockItemList}/>
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
