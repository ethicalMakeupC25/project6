// a couple of functions from the React library
import React, { Fragment } from "react";

const ReviewReadPanel = ({review}) => {
    return (
        <div className="reviewPanel" key={review.uniqueKey}>
            <p>
            <span className="userSpan">{review.userName}</span>
            {review.userReview}
            <span className="userSpan">Would you buy this again:</span>
            {review.userRepurchase}
            <span className="userSpan">User Rated this product: </span>
            {
                // error handling for user rating.
                review.userRating ?
                <Fragment>
                    {review.userRating}/5
                </Fragment>
                :
                <Fragment>
                    <p>This product has no user provided ratings yet! Would you like to rate this product?</p>
                </Fragment>
            }
            </p>
        </div>
    );
};

export default ReviewReadPanel;
