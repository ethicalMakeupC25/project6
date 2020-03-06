// a couple of functions from the React library
import React from "react";

const ReviewForm = props => (
    <div className="reviewInput">
        <form action="submit" onSubmit={e => props.handleFormSubmit(e)}>
            <label className="visually-hidden" htmlFor="reviewForm">
                Please type your message!
            </label>
            <input
                placeholder= "What is your name?"
                className="nameInputField"
                type="text"
                id="reviewForm"
                onChange={props.handleChange}
                value={props.userInputProp} // good for accessibility and screen readers, this will track the changes even if they leave and come back
            />
            <textarea 
                id="reviewForm" 
                rows="10" 
                cols="80" 
                placeholder="Your Review:"
                ></textarea>

            <button className="submitButton" type="submit">
                Submit
            </button>
        </form>
    </div>
);

export default ReviewForm;
