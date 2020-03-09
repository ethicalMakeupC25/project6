// a couple of functions from the React library
import React from "react";

const ReviewReadPanel = (review) => {
    return (
        <div className="reviewPanel" key={review.uniqueKey}>
            <p>
            <span className="userSpan">{review.userName}</span>
            {review.userReview}
            <span className="userSpan">Would you buy this again:</span>
            {review.userRepurchase}
            </p>
        </div>
    );
};

export default ReviewReadPanel;
