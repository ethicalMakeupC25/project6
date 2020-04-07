// a couple of functions from the React library
import React from "react";

const EachReview = ({ review }) => {

  console.log(review);
  console.log(review.review.userInput);
  console.log(review.review.userReview);
  console.log(review.review.userRepurchase);
  return (
    <div className="reviewDisplay" id="reviewDisplay">
      <p>
        <span className="userSpan">{review.review.userInput}</span>
        {review.review.userReview}
        <span className="userSpan">Would you buy this again:</span>
        {review.review.userRepurchase}
      </p>
    </div>
  );
};

export default EachReview;
