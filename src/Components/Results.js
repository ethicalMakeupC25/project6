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
    this.setState({ activeID: id });
  }

  checkForProduct = (productID) => {
    let itemAlreadyOnList = false;
    this.state.wishlist.filter(product => {
      if (product === productID) {
        itemAlreadyOnList = true;
        return true;
      }
    });
    return itemAlreadyOnList;
  }

  addToWishlist = (product) => {
    if (!this.props.user) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please log in to make a wishlist!'
      })
    } else if (this.checkForProduct(product.id)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'This product is already on your wishlist!'
      })
    } else {
      const dbRefUserWish = firebase.database().ref(`users/${this.props.user.uid}/wishlist`);
      dbRefUserWish.push(product.id);
      Swal.fire({
        icon: 'success',
        title: 'Added to Wishlist!',
        text: `${product.name} was added to your wishlist.`
      })
    }
  }

  componentDidMount() {
    if (this.props.user) {
      const dbRefUserWish = firebase.database().ref(`users/${this.props.user.uid}/wishlist`);
      dbRefUserWish.on('value', response => {
        console.log(response.val())
        if (response.val()) {
          this.setState({ wishlist: Object.values(response.val()) });
        }
      });
    }
  }

  componentWillUnmount() {
    const dbRefUserWish = firebase.database().ref(`users/${this.props.user.uid}/wishlist`);
    dbRefUserWish.off();
  }

  render() {
    return (
      <section className="results">
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
                  addToWishlist={this.addToWishlist} />
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