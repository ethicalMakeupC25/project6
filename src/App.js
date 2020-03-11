// a couple of functions from the React library
import React, { Component, Fragment } from "react";
//import firebase
import firebase, { auth, provider } from './firebase';
// import components
import Helmet from './Components/Helmet.js';
import Preloader from './Components/Preloader';
import Header from './Components/Header';
import Main from './Components/Main';
import Footer from './Components/Footer';
// import axios
import axios from 'axios';
// import react-router
import { BrowserRouter as Router } from 'react-router-dom';
// CSS for the `App` component
import "./App.scss";

class App extends Component {
  constructor() {
    super()

    this.state = {
      //set initial state for api data
      veganArray: [],
      //set initial state for preloader
      isLoading: true,
      //set initial state for user login (auth details and historical)
      user: null
    }
  }

  componentDidMount() {
    //api call for data, stored in state veganArray
    //state isLoading set to false to unmount preloader and mount webpage components
    axios({
      url: 'https://makeup-api.herokuapp.com/api/v1/products.json',
      method: 'GET',
      responseType: 'json',
      params: {
        product_tags: 'vegan',
      }
    }).then((response) => {
      this.setState({
        veganArray: response.data,
        isLoading: false,
      })
    })
    //authetication history checked for user to allow persisted login status which triggers loggedin components
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      }
    })
  }

  //this function initializes the popup from google to sign in and sets the user state to user's details
  login = () => {
    auth.signInWithPopup(provider) 
      .then((result) => {
        this.setState({
          user: result.user
        });
      });
  }

  //this function initializes sign out and sets the user state back to null, returning enduser to guest/anonymous view components
  logout = () => {
    auth.signOut()
      .then(() => {
        this.setState({
          user: null
        });
      });
  }

  render() {
    return (
      <Router>
        {/* router may only have one child therefore wrap all components in a fragment */}
        <Fragment>
          {/* helmet allows for injected title, meta tags */}
          <Helmet />
          {/* determine component view based on isLoading state */}
          {this.state.isLoading ? (
            <Preloader />
          ) : (
            <div className="outerWrapper">
              <Header
                login={this.login}
                logout={this.logout}
                user={auth.currentUser}
              />
              <Main
                veganProducts={this.state.veganArray}
                user={auth.currentUser}
                userCheck={auth.onAuthStateChanged}
              />
              <Footer />
            </div>
          )}
        </Fragment>
      </Router>
    );
  }
}

export default App;
