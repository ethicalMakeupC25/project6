// a couple of functions from the React library
import React from "react";
import ReviewSubmitButton from './ReviewSubmitButton';

const ReviewForm = props => (
    <div className="reviewInput wrapper">
        <form className="reviewForm" action="submit" onSubmit={e => props.handleFormSubmit(e)}>
            <label className="visually-hidden" htmlFor="reviewForm">
                Please Enter Your Review!
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
                onChange={props.handleChangeTxtArea}
                value={props.userReviewProp}
                ></textarea>
            <section className="radioSection">
            {/* radio input for purchase or won't repurchase. */}
                <p>Would You Repurchase This Item?</p>
                <div>
                    <div className="yesInput">
                        <input 
                            type="radio" 
                            id="Yes" 
                            value="yes"
                            name="reviewForm"
                            onChange={props.radioChange}
                            />
                        <label htmlFor="Yes">Yes</label>
                    </div>

                    <div className="noInput">
                        <input
                            type="radio" 
                            id="No" 
                            value="no"
                            name="reviewForm"
                            onChange={props.radioChange}
                            />
                        <label htmlFor="No">No</label>
                    </div>
                </div>
            </section>

            <ReviewSubmitButton />
        </form>
    </div>
);

export default ReviewForm;
