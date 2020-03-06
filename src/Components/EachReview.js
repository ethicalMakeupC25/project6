// a couple of functions from the React library
import React from "react";

// import firebase
import firebase from "./../firebase";

const EachReview = ({ msgProp }) => {
  // 🧠 function to remove messages
    // let remove = key => {
    //     const dbRef = firebase.database().ref();
    //     dbRef.child(msgProp.key).remove();
    // };


    return (
        <div className="eachReview" key={msgProp.key}>
        <img src={msgProp.message.userImg} alt={msgProp.review.userName} />

        {/* user name and message */}
        <p>
            <span className="blueFont">{msgProp.message.userName} : </span>
            {msgProp.review.userInput}
        </p>
        </div>
    );
};

export default EachReview;
