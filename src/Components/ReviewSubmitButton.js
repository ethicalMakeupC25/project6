// a couple of functions from the React library
import React, { Component } from 'react';
import firebase from 'firebase';

class ReviewSubmitButton extends Component{
    constructor({ratingProps}){
        super({ratingProps});
        this.state = {
            userRating: ratingProps,
            readReview: true
        }
        console.log(ratingProps)
    }

    componentDidMount() {
        // create a variable that holds a reference to  database
        const dbRef = firebase.database().ref();
    }

    GoToReviewPanel = () => {
        this.setState({
            ...this.state,
            readReview: false,
            GoToReviews: true
        })
    }
    
    
    render() {
        const dbRef = firebase.database().ref(`${this.state.uID}`);
        dbRef.on("value", response => {
        const dataFromDb = response.val();
        // see the information and parse the way we want it.
        // console.log("dataFromDb3", dataFromDb);

        const newState = [];

        for (let key in dataFromDb) {
            const reviewInfo = {
            key: key,
            review: dataFromDb[key]
            };
            newState.push(reviewInfo);
            console.log("reviewInfo(from button)", reviewInfo);

            // this.setState({
            //     userRating: 
            // })
            console.log("reviewInfo(from button)", reviewInfo);
        }
    });

    
    return (
        <button 
                className="submitButton" 
                type="submit" 
                onClick={()=>{
                    dbRef.push({userRating: this.state.currentRating})
                    }}>
                Submit
            </button>
        );
    }
}
export default ReviewSubmitButton;