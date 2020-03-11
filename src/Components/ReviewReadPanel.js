// a couple of functions from the React library
import React, { Fragment } from "react";

const ReviewReadPanel = ({review}) => {
    console.log(review)
    // console.log(this.props.user.photoURL)
    return (
        <div className="reviewPanel">

            <div className="userDetails">
                <span className="userSpan">Review Date: </span>{review.review.reviewDate}
                <div className="userImg">
                    <img src={review.review.userImg} alt={review.review.userName}/>
                </div>
            </div>

            <div className="review">
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
        </div>
    );
};

export default ReviewReadPanel;
