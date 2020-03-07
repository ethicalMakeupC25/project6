// a couple of functions from the React library
import React from "react";
import EachReview from './EachReview';

const ReviewReadPanel = ({reviewListProp}) => {
    return (
        console.log('reviewListProp',reviewListProp.review),
        <div className="reviewPanel">
            <ul>
                {reviewListProp.review.map(reviewProps => (
                <EachReview reviewList={reviewProps} />
                ))}
            </ul>
        </div>
    );
};

export default ReviewReadPanel;
