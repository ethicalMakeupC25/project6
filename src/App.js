// a couple of functions from the React library
import React, { Component } from "react";

// import components

// import firebase
import firebase from "./firebase";

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

     // create a variable that holds a reference to  database
    const dbRef = firebase.database().ref();
 
    // create variable that holds reference to the search results
    let searchResults;
    // 🧠 event listener that takes a callback function used to get data from the database and call it response.
    dbRef.on("value", response => {
      const dataFromDb = response.val();
      console.log('dataFromDb', dataFromDb)
      // see the information and parse the way we want it.
 
      // create a variable to store the new state.
      const newState = [];
 
      // loop over each value in the array and push them to a new array (newState).
      for (let key in dataFromDb) {
        const results = {
          key: key,
          value: dataFromDb[key]
        };
        newState.push(results);
      }
      // call this.setState to update the component state using the local array newState.
      this.setState({
        searchResults: newState,
      });
    });
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
