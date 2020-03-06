// a couple of functions from the React library
import React, { Component, Fragment } from "react";
import ReviewForm from "./ReviewForm";
import { render } from "@testing-library/react";
import firebase from "./../firebase";
import EachReview from "./EachReview";



class ReviewPanel extends Component {
    constructor() {
        super();
        this.state = {
        reviews: [],
        userImg: "", //need to figure out how to keep an image url in the database. and find image storage
        userInput: "",
        userId: "000"
        };
    }

    componentDidMount() {
        // create a variable that holds a reference to  database
        const dbRef = firebase.database().ref();
    
        // 🧠 event listener that takes a callback function used to get data from the database and call it response.
        dbRef.on("value", response => {
            const dataFromDb = response.val();
            // see the information and parse the way we want it.
            console.log(dataFromDb);
    
            // create a variable to store the new state.
            const newState = [];
    
            // loop over each value in the array and push them to a new array (newState).
            for (let key in dataFromDb) {
                const reviewInfo = {
                key: key,
                review: dataFromDb[key]
                };
                newState.push(reviewInfo);
            }
            // call this.setState to update the component state using the local array newState.
            this.setState({
                review: newState
            });
        }
        )}

    // function to handle input for review form:
    handleChange = e => {
        this.setState({
        userInput: e.target.value
        });
    };

    // 🧠 on submit, push user input into firebase
    handleFormSubmit = e => {
        e.preventDefault();
        const dbRef = firebase.database().ref();
        dbRef.push({
        userInput: this.state.userInput,
        userReview: this.state.userReview
        });
        // return input to empty.
        // eslint-disable-next-line
        this.state.userInput = "";
    };

    render(){
        return (
            <Fragment>
                <div className="mainGrid">
                    <div className="reviewDisplay" id="reviewDisplay"></div>
                    {this.state.reviews.map(message => (
                    // Div containers for each message.
                    <EachReview msgProp={review} />
                    ))}
                    <ReviewForm
                        handleFormSubmit={this.handleFormSubmit}
                        handleChange={this.handleChange}
                        userInputProp={this.state.userInput}
                    />
                </div>
            </Fragment>
        );
    }
}



export default ReviewPanel;
