import React, { Component } from 'react';
import firebase from '../firebase'

class Wishlist extends Component {
    componentDidMount() {
        const dbRefUser = firebase.database().ref(`users/${this.state.uID}/`);
    }

    render() {
        return (
            <section className="wishList">
                <ul>
                    
                </ul>
            </section>
        )
    }
}

export default Wishlist;