import React, { Component } from 'react';
import firebase from '../firebase';
import ReviewReadPanel from './ReviewReadPanel';

class UserReviews extends Component {
    constructor() {
        super();

        //initial states
        this.state = {
            //empty reviews array for firebase reviews to be stored
            reviews: []
        }
    }
    
    componentDidMount() {
        const dbRefUser = firebase.database().ref(`users/${this.props.user.uid}/reviews/`);
        dbRefUser.on("value", response => {
            const dataFromDB = response.val();
            const newState = [];
            //loop through dataFromDB and push reviews into array as well as the matching key to be used for React DOM
            for (let key in dataFromDB) {
                newState.push({ review: dataFromDB[key], key })
            }
            //update state for reviews array
            this.setState({
                reviews: newState
            })
        });
    }

    render() {
        return (
            <section className="userReviews">
                {
                    this.state.reviews.length !== 0
                        ?
                        this.state.reviews.map(review => {
                            return <ReviewReadPanel review={review} key={review.key} />
                        })
                        :
                        <p>You haven't reviewed any products yet! Try going to Search and check out some products you can review.</p>
                }
            </section>
        )
    }
}

export default UserReviews;