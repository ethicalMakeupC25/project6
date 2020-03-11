import React, { Component, Fragment } from "react";
import firebase from "./../firebase";
import Swal from "sweetalert2";
import ReviewReadPanel from "./ReviewReadPanel";
import ReviewForm from "./ReviewForm";

class ReviewParent extends Component {
    constructor() {
        super();
        //setting initial state
        this.state = {
            //empty reviews array to take in database info
            reviews: [],
            //handlers for user review form
            userName: "",
            userRating: 0,
            userReview: "",
            userRepurchase: "",
            //for assigning userID on mount
            userID: "",
            isReviewing: false,
            userImg: "", 
            reviewDate: '',

        };
    }

    componentDidMount() {
        //error handling for anonymous users, assigns userID on mount which will be used for form submission to firebase
        if (this.props.user) {
            this.setState({
                userID: this.props.user.uid,
                userImg: this.props.user.photoURL
            })
        } else {
            this.setState({
                userID: '00000',
                userImg: "https://i.ibb.co/rQsjc9y/images.png"
            })
        }

        //create a variable that holds a reference to database
        const dbRef = firebase.database().ref(`products/${this.props.activeID}/`);
        //event listener that takes a callback function used to get data from the database and called response
        dbRef.on("value", response => {
            const dataFromDb = response.val();
            const newState = [];
            //loop through dataFromDb and push reviews into array as well as the matching key to be used for React DOM
            for (let key in dataFromDb) {
                newState.push({ review: dataFromDb[key], key })
            }
            // see the information and parse the way we want it.
            // call this.setState to update the component state using the local array newState.
            this.setState({
                    reviews: newState
            });
        })
    }

    //functions to handle inputs for review form:
    handleChange = e => {
        this.setState({
            userName: e.target.value
        })
    }

    handleChangeTxtArea = e => {
        this.setState({
            userReview: e.target.value
        })
    }

    radioChange = (changeEvent) => {
        this.setState({
            userRepurchase: changeEvent.target.value
        })
    }

    //on submit, push user input into firebase
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
                const dbRefUser = firebase.database().ref(`users/${this.state.userID}/reviews/`);
                //double push to save review to products and to users
                //firebase database is structured to allow ease of referencing information for 3 different pulls: 1. all reviews by product 2. all reviews by user and 3. all wishlist items by user
                dbRef.push({
                    userName: this.state.userName,
                    userImg:this.state.userImg, 
                    userRating:this.state.userRating,
                    userReview: this.state.userReview,
                    userRepurchase: this.state.userRepurchase,
                    userID: this.state.userID
                })
                dbRefUser.push({
                    userName: this.state.userName,
                    userImg: this.state.userImg,
                    userRating: this.state.userRating,
                    userReview: this.state.userReview,
                    userRepurchase: this.state.userRepurchase,
                    userID: this.state.userID,
                    productID: this.props.activeID
                })
                // return input to empty.
                this.setState({
                    userName: "",
                    userReview: "",
                    userRepurchase: ""
                }, this.setRead)
            }
        };

    setRead = () => {
        if (this.props.isWriting) {
            this.props.toggleReadReview();
        }
    }

    setWrite = () => {
        if (!this.props.isWriting) {
            this.props.toggleReadReview();
        }
    }

    getStarRating = (currentRating) => {
        this.setState({
            userRating: currentRating
        })
    } 
    
    getUserInputDateTime = (currentDateTime) => {
        this.setState({
            reviewDate: currentDateTime
        });
    }


    render(){
        // console.log(this.props.user.photoURL)

        return (
            <Fragment>
                <div className="reviewButtons">
                    <button onClick={this.setWrite}>write review</button>
                    <button onClick={this.setRead}>reviews</button>
                </div>
                <div className={`mainGrid wrapper noOverflowX ${!this.props.isWriting && "scrollOn"}`} >
                { 
                    !this.props.isWriting ? 
                    <div className="reviews">
                        { this.state.reviews.length !== 0
                            ?
                            this.state.reviews.map(reviewList => {
                                return <ReviewReadPanel review={reviewList} key={reviewList.key} user={this.props.user}/>
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
                        userNameProp={this.state.userName}
                        userReviewProp={this.state.userReview}
                        userStarProp={this.onStarClick}
                        userRatingProp={this.userRating}
                        starRatingFunc = {this.getStarRating}
                        dateProp = {this.getUserInputDateTime}
                    />
                }
                </div>
            </Fragment>
        );
    }
}



export default ReviewParent;
