import React, { Component } from 'react';
import firebase from '../firebase';

class UserReviews extends Component {
    componentDidMount() {
        const dbRefUser = firebase.database().ref(`users/${this.state.uID}/reviews/`);

        
    }

    render() {
        return (
            <section className="userReviews">
                <p>hi</p>
            </section>
        )
    }
}

export default UserReviews;