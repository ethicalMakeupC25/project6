// a couple of functions from the React library
import React from "react";

<<<<<<< HEAD
const EachReview = ({ review }) => {

  console.log(review);
  console.log(review.review.userInput);
  console.log(review.review.userReview);
  console.log(review.review.userRepurchase);
  return (
    <li className="reviewDisplay" id="reviewDisplay">
      <p>
        <span className="userSpan">{review.review.userInput}</span>
        {review.review.userReview}
        <span className="userSpan">Would you buy this again:</span>
        {review.review.userRepurchase}
=======
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
>>>>>>> master
      </p>
    </li>
  );
};

export default EachReview;
