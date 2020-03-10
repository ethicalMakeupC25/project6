// a couple of functions from the React library
import React, { Component, Fragment } from "react";
import ReviewForm from "./ReviewForm";
import firebase from "./../firebase";
import ReviewReadPanel from "./ReviewReadPanel";
import Swal from "sweetalert2";


class ReviewParent extends Component {
    constructor() {
        super();
        this.state = {
        reviews: [],
        userImg: "", //need to figure out how to keep an image url in the database. and find image storage
        userName: "",
        userReview: "",
        userID: "",
        userRepurchase: '',
        uniqueKey: '',
        isReviewing: false
        };
    }

    componentDidMount() {
        // error handling for guest / anonymous users
        if (this.props.user) {
            this.setState({
                userID: this.props.user.uid
            })
        } else {
            this.setState({
                userID: '00000'
            })
        }

        // create a variable that holds a reference to  database
        const dbRef = firebase.database().ref(`products/${this.props.activeID}/`);
    
        // 🧠 event listener that takes a callback function used to get data from the database and call it response.
        dbRef.on("value", response => {
            const dataFromDb = response.val();
            const newState = [];
            for (let key in dataFromDb) {
                newState.push(dataFromDb[key])
            }
            // see the information and parse the way we want it.
            // call this.setState to update the component state using the local array newState.
            this.setState({
                    reviews: newState
            }, () => {console.log(this.state.reviews)});
        }
        )}

    // 🧮 function to handle inputs for review form:
    handleChange = e => {
        this.setState({
        userName: e.target.value
        })
    };

    handleChangeTxtArea = e => {
        this.setState({
        userReview: e.target.value
        })
    };

    radioChange = (changeEvent) => {
        this.setState({
            userRepurchase: changeEvent.target.value
        });
    }

    // 🧠 on submit, push user input into firebase
    handleFormSubmit = e => {
        e.preventDefault();    
        if (!this.state.userName ||
            !this.state.userReview ||
            !this.state.userRepurchase) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text:
                        "You've missed something! Please fill everything in the form!"
                });
            } else {
                const dbRef = firebase.database().ref(`products/${this.props.activeID}/`);
                const dbRefUser = firebase.database().ref(`users/${this.state.uID}/`);
                dbRef.push({
                    userName: this.state.userName,
                    userReview: this.state.userReview,
                    userRepurchase: this.state.userRepurchase,
                    userID: "00000",
                    uniqueKey: this.state.uniqueKey
                })
                dbRefUser.push({
                    userName: this.state.userName,
                    userReview: this.state.userReview,
                    userRepurchase: this.state.userRepurchase,
                    userID: "00000",
                    uniqueKey: this.state.uniqueKey
                })
                // console.log('dbRef',dbRef));
        
                // return input to empty.
                // eslint-disable-next-line
                this.setState({
                    userName: "",
                    userReview: "",
                    userRepurchase: ''
                })
            }

    };

    setRead = () => {
        if(this.props.isWriting) {
            this.props.toggleReadReview();
        }
    }

    setWrite = () => {
        if(!this.props.isWriting) {
            this.props.toggleReadReview();
        }
    }
    
    render(){
        return (
            <Fragment>
                <div className="reviewButtons">
                    <button onClick={this.setWrite}>write review</button>
                    <button onClick={this.setRead}>reviews</button>
                </div>
                <div className={`mainGrid wrapper ${!this.props.isWriting && "scrollOn"}`} >
                    {!this.props.isWriting ? 
                    <div className="reviews">
                        { this.state.reviews.length !== 0
                            ?
                            this.state.reviews.map(reviewList => {
                                return <ReviewReadPanel review={reviewList}/>
                            })
                            :
                            <p>Oops, no reviews exist of this product yet! Why not leave your own review if you've tried this product before?</p>
                        }
                    </div> : 
                    <ReviewForm
                        handleFormSubmit={this.handleFormSubmit}
                        handleChangeTxtArea={this.handleChangeTxtArea}
                        handleChange={this.handleChange}
                        radioChange={this.radioChange}
                        userInputProp={this.state.userInput}
                        userReviewProp={this.state.userReview}
                        userStarProp={this.onStarClick}
                    />
                    }
                </div>
            </Fragment>
        );
    }
}



export default ReviewParent;
