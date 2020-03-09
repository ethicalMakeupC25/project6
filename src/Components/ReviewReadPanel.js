// a couple of functions from the React library
import React from "react";
import EachReview from './EachReview';

const ReviewReadPanel = (review) => {
    return (
        <div className="reviewPanel" key={review.uniqueKey}>
                <EachReview review={review} />
        </div>
    );
};

export default ReviewReadPanel;
