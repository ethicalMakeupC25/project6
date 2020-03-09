// a couple of functions from the React library
import React from "react";

const ReviewReadPanel = (review) => {
    console.log({review})
    return (
        <div className="reviewPanel" key={review.review.uniqueKey}>
            <p>
            <span className="userSpan">{review.review.userName}</span>
            {review.review.userReview}
            <span className="userSpan">Would you buy this again:</span>
            {review.review.userRepurchase}
            </p>
        </div>
    );
};

export default ReviewReadPanel;
