// a couple of functions from the React library
import React, { Component } from "react";

// import components

// import firebase
// import firebase from "./firebase";

// import axios
import axios from 'axios';

// import sweet alerts

// CSS for the `App` component
import "./App.scss";

class App extends Component {
  constructor() {
    super()

    this.state = {
      veganArray: [],
    }
  }


  componentDidMount() {
    axios({
      url: 'http://makeup-api.herokuapp.com/api/v1/products.json',
      method: 'GET',
      responseType: 'json',
      params: {
        product_tags: 'vegan',
      }
    }).then((response) => {
      console.log(response.data);
      this.setState({
        veganArray: response.data
      })
    })
  }


  render() {

    return (
      <div className="App">
        <h1>testing to see if this works</h1>
      </div>
    );
  }
}

export default App;
