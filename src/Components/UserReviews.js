import React, { Component } from 'react';
import firebase from '../firebase';
import ReviewReadPanel from './ReviewReadPanel';

class UserReviews extends Component {
    constructor() {
        super();

        //initial states
        this.state = {
            //empty reviews array for firebase reviews to be stored
            reviews: [],
            //empty products array for products reviewed to be stored
            products: []
        }
    }
    
    componentDidMount() {
        const dbRefUser = firebase.database().ref(`users/${this.props.user.uid}/reviews/`);
        dbRefUser.on("value", response => {
            const dataFromDB = response.val();
            const newState = [];
            const productIDs = [];
            const reviewedProducts = [];
            //loop through dataFromDB and push reviews into array as well as the matching key to be used for React DOM
            for (let key in dataFromDB) {
                newState.push({ review: dataFromDB[key], key });
                productIDs.push(dataFromDB[key].productID);
            }
            //pull product info of products reviewed from veganProducts
            if (productIDs.length !== 0) {
                this.props.veganProducts.map(product => {
                    return productIDs.forEach(id => {
                        if (id === product.id) {
                            reviewedProducts.push(product)
                        }
                    })
                })
            }
            //update state for reviews array
            this.setState({
                reviews: newState,
                products: reviewedProducts
            }, () => {console.log(this.state.reviews, this.state.products)})
        });
    }

    render() {
        return (
            <section className="userReviews">
                {
                    this.state.reviews.length !== 0
                        ?
                        this.state.reviews.map(review => {
                            return (
                                <div key={review.key}>
                                    <div className="productImage">
                                        <img src={this.state.products[this.state.reviews.indexOf(review)].api_featured_image} alt={this.state.products[this.state.reviews.indexOf(review)].name} />
                                        <div className="productTextContainer">
                                            <div className="productText">
                                            <h2>{this.state.products[this.state.reviews.indexOf(review)].name}</h2>
                                            <p>Brand: {!this.state.products[this.state.reviews.indexOf(review)].brand ? "Not available" : this.state.products[this.state.reviews.indexOf(review)].brand}</p>
                                            <p>Price: {
                                                this.state.products[this.state.reviews.indexOf(review)].price === "0.0" ? "Not available" :
                                                `
                                                ${this.state.products[this.state.reviews.indexOf(review)].price_sign ? this.state.products[this.state.reviews.indexOf(review)].price_sign : '$'}${parseInt(this.state.products[this.state.reviews.indexOf(review)].price).toFixed(2)} 
                                                ${this.state.products[this.state.reviews.indexOf(review)].currency ? this.state.products[this.state.reviews.indexOf(review)].currency : ''}
                                                `
                                            }</p>
                                            <p>Rating: {!this.state.products[this.state.reviews.indexOf(review)].rating ? "Not yet rated" : `${this.state.products[this.state.reviews.indexOf(review)].rating}/5`}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <ReviewReadPanel review={review} user={this.props.user} />
                                </div>
                            )
                        })
                        :
                        <p>You haven't reviewed any products yet! Try going to Search and check out some products you can review.</p>
                }
            </section>
        )
    }
}

export default UserReviews;