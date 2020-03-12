import React, { Component } from 'react';
import firebase from '../firebase';
import Results from './Results';
import { withRouter } from 'react-router-dom';

const SomeComponent = withRouter(props => <Wishlist {...props}/>);

class Wishlist extends Component {
    constructor() {
        super();
        this.state = {
            userWishlist: []
        }
    }

    componentDidMount() {
        const dbRefUserWish = firebase.database().ref(`users/${this.props.user.uid}/wishlist`);

        dbRefUserWish.on('value', response => {
            if(response.val()){
                const productIDs = Object.values(response.val());
                const productArray = [];

                // grabs the items the user saved and filters it out from the list of products
                productIDs.forEach(id => {
                    this.props.veganProducts.filter(product => {
                        if (product.id === id) {
                            productArray.push(product);
                            return true;
                        }
                    });
                });
    
                this.setState({ userWishlist: productArray });
            }
        })
    }

    componentWillUnmount() {
        const dbRefUserWish = firebase.database().ref(`users/${this.props.user.uid}/wishlist`);
        dbRefUserWish.off();
    }

    render() {
        return (
            <section className="wishlist">
                <h2>Your Wishlist</h2>
                <Results filteredResults={this.state.userWishlist} user={this.props.user} />
            </section>
        )
    }
}

export default Wishlist;