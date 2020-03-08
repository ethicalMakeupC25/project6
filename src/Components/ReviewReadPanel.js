// a couple of functions from the React library
import React from "react";
import EachReview from './EachReview';

const ReviewReadPanel = (review) => {
    return (
        console.log(review),
        <div className="reviewPanel" >
                <EachReview review={review} />
        </div>
    );
};

export default ReviewReadPanel;
