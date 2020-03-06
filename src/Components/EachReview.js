// a couple of functions from the React library
import React from "react";

const EachReview = ({ revProp }) => {
  // 🧠 function to remove messages
    // let remove = key => {
    //     const dbRef = firebase.database().ref();
    //     dbRef.child(msgProp.key).remove();
    // };

    console.log(revProp)
    return (
        <div key={revProp.key}>
            
        </div>
    );
};

export default EachReview;
