import React, { Component } from "react";
import firebase from 'firebase';
// star rating component from https://scotch.io/tutorials/build-a-star-rating-component-for-react

class StarRating extends Component {
    constructor(props) {
        super(props);
        this.state = {
        currentRating: this.props.currentRating
        };
    }

    componentDidMount() {
        this.setRating();

        // create a variable that holds a reference to  database
        const dbRef = firebase.database().ref();
    
        // 🧠 event listener that takes a callback function used to get data from the database and call it response.
        dbRef.on("value", response => {
            const dataFromDb = response.val();
            // see the information and parse the way we want it.
            console.log('dataFromDb2', dataFromDb);
        })
    }

    hoverHandler = ev => {
        const stars = ev.target.parentElement.getElementsByClassName("star");
        const hoverValue = ev.target.dataset.value;
        Array.from(stars).forEach(star => {
        star.style.color = hoverValue >= star.dataset.value ? "yellow" : "gray";
        });
    };

    setRating = ev => {
        const stars = this.refs.rating.getElementsByClassName("star");
        Array.from(stars).forEach(star => {
        star.style.color =
            this.state.currentRating >= star.dataset.value ? "yellow" : "gray";
        });
    };

    starClickHandler = ev => {
        let rating = ev.target.dataset.value;
        this.setState({ currentRating: rating }); // set state so the rating stays highlighted
        if (this.props.onClick) {
        this.props.onClick(rating); // emit the event up to the parent
        }
        const dbRef = firebase.database().ref();
        dbRef.push({
            userRating: this.state.userRating,
        },
        console.log('dbRef',dbRef));
    };

    render() {
        return (
        <div
            className="rating"
            ref="rating"
            data-rating={this.state.currentRating}
            onMouseOut={this.setRating}
        >
            {[...Array(+this.props.numberOfStars).keys()].map(n => {
            return (
                <span
                className="star"
                key={n + 1}
                data-value={n + 1}
                onMouseOver={this.hoverHandler}
                onClick={this.starClickHandler}
                >
                &#9733;
                </span>
            );
            })}
        </div>
        );
    }
}

export default StarRating;
