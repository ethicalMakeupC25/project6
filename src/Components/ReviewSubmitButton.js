// a couple of functions from the React library
import React, { Component } from 'react';

class ReviewSubmitButton extends Component{
    constructor(){
        super();
        this.state = {
            readReview: true
        }
    
}
    render(){
        return (
            <button 
                    className="submitButton" 
                    type="submit">
                    Submit
            </button>
            );
    }
    
}
export default ReviewSubmitButton;