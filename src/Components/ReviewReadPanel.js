// a couple of functions from the React library
import React, { Fragment } from "react";

const ReviewReadPanel = ({ review }) => {
    return (
        <div className="reviewPanel">
            <p>
            <span className="userSpan">{review.review.userName}</span>
            {review.review.userReview}
            <span className="userSpan">Would you buy this again:</span>
            {review.review.userRepurchase}
            <span className="userSpan">User Rated this product: </span>
            {
                // error handling for user rating.
                review.review.userRating ?
                <Fragment>
                    {review.review.userRating}/5
                </Fragment>
                :
                <Fragment>
                    User did not provide rating out of 5.
                </Fragment>
            }
            </p>
        </div>
    );
};

export default ReviewReadPanel;
