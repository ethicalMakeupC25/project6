// a couple of functions from the React library
import React, { Component } from 'react';
import firebase from 'firebase';

class ReviewSubmitButton extends Component{
    constructor({ratingProps}){
        super({ratingProps});
        this.state = {
            currentRating: ratingProps,
            readReview: true
        }
    }

    
    GoToReviewPanel = () => {
        this.setState({
            ...this.state,
            readReview: false,
            GoToReviews: true
        })
    }
    
    
    render(){
        const dbRef = firebase.database().ref();
        return (
            <button 
                className="submitButton" 
                type="submit" 
                onClick={()=>{dbRef.push({userRating: this.state.currentRating})}}>
                Submit
            </button>
        );
    }
}
export default ReviewSubmitButton;