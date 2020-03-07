// a couple of functions from the React library
import React from "react";

const EachReview = ({ reviewList }) => {

  console.log(reviewList);
  console.log(reviewList.userInput);
  console.log(reviewList.userReview);
  console.log(reviewList.userRepurchase);
  return (
    <li className="reviewDisplay" id="reviewDisplay">
      <p>
        <span className="userSpan">{reviewList.userInput}</span>
        {reviewList.userReview}
        <span className="userSpan">Would you buy this again:</span>
        {reviewList.uerRepurchase}
      </p>
    </li>
  );
};

export default EachReview;
