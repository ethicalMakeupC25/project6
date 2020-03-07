// a couple of functions from the React library
import React from "react";
import EachReview from './EachReview';

const ReviewReadPanel = (review) => {
    return (
        <div className="reviewPanel" >
            <ul>
                <EachReview review={review} />
            </ul>
        </div>
    );
};

export default ReviewReadPanel;
