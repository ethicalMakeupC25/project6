import React, { Component } from 'react';
import ResultItem from './ResultItem';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import firebase from '../firebase';
import Swal from 'sweetalert2';

class Results extends Component {
  constructor() {
    super();

    this.state = {
      activeID: null,
      wishlist: []
    }
  }

  setActiveID = (e, id) => {
    this.setState({activeID: id});
  }

  // loop through the wishlist and if there's a match with the given ID
  // return true
  checkForProduct = (productID) => {
    let itemAlreadyOnList = false;
    this.state.wishlist.filter(product => {
      if(product.productID === productID){
        itemAlreadyOnList = true;
        return true;
      }
    });
    return itemAlreadyOnList;
  }

  addToWishlist = (product) => {
    // User can only add to a wishlist if they're logged in
    if(!this.props.user) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please log in to make a wishlist!'
      })
    } 
    // User can only add items that aren't on the wishlist
    else if(this.checkForProduct(product.id)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'This product is already on your wishlist!'
      })
    } 
    
    // Now that we know the user exists and there's no dupes, add it to the list.
    else {

      const dbRefUserWish = firebase.database().ref(`users/${this.props.user.uid}/wishlist`);
      dbRefUserWish.push(product.id);

      Swal.fire({
        icon: 'success',
        title: 'Added to Wishlist!',
        text: `${product.name} was added to your wishlist.`
      })
    }
  }

  // find the given ID from the wishlist and remove that item
  removeFromWishlist = (id) => {
    const filteredProduct = this.state.wishlist.filter(product => {
      return product.productID === id
    })

    const keyToDelete = filteredProduct[0].key;

    const dbRefUserWish = firebase.database().ref(`users/${this.props.user.uid}/wishlist/${keyToDelete}`);
    dbRefUserWish.remove();
  }

  componentDidMount() {
    // set a wishlist if user is logged in
    if(this.props.user) {
      const dbRefUserWish = firebase.database().ref(`users/${this.props.user.uid}/wishlist`);
      dbRefUserWish.on('value', response => {
        const newState = [];
        const dbData = response.val();
        if(dbData) {
          for(let key in dbData) {
            newState.push({productID: dbData[key], key});
          }

          this.setState({wishlist: newState});
        }
      });
    }
  }

  componentWillUnmount() {
    if(this.props.user) {
      const dbRefUserWish = firebase.database().ref(`users/${this.props.user.uid}/wishlist`);
      dbRefUserWish.off();
    }
  }

  render() {
    return (
      <section className="results">
        {/* Displays items if the filtered results array isn't empty */}
        {
          this.props.filteredResults.length > 0
            ?
            this.props.filteredResults.map(product => {
              return (
                <ResultItem 
                    key={product.id} 
                    setActiveID={this.setActiveID} 
                    activeID={this.state.activeID} 
                    product={product} 
                    user={this.props.user} 
                    addToWishlist={this.addToWishlist}
                    removeFromWishlist={this.removeFromWishlist}/>
              );
            })
            :
            <p>No results! Please try again.</p>
        }
      </section>
    )
  }
}

export default Results;