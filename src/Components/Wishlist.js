import React, { Component } from 'react';
import firebase from '../firebase'

class Wishlist extends Component {
    componentDidMount() {
        const dbRefUserWish = firebase.database().ref(`users/${this.props.user.uid}/wishlist`);

        dbRefUserWish.on('value', response => {
            console.log(response)
        })
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