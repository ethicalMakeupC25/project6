// a couple of functions from the React library
import React, { Component } from 'react';


class ReviewSubmitButton extends Component{
    constructor(){
        super();
        this.state = {
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
        return (
            <button 
                className="submitButton" 
                type="submit" 
                onClick={this.state.GoToReviews}>
                Submit
            </button>
        );
    }
}
export default ReviewSubmitButton;