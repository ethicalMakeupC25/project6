// a couple of functions from the React library
import React from "react";


const ReviewReadPanel = () => {

    return (
        <div>
            {this.state.GoToReviews && <ReviewReadPanel />}
        </div>
    );
};

export default ReviewReadPanel;
