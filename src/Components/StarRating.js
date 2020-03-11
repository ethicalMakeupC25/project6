import React, { Component } from "react";


// star rating component from https://scotch.io/tutorials/build-a-star-rating-component-for-react; adjusted for use in this project.

class StarRating extends Component {
    constructor(props) {
        super(props);
        this.state = {
        currentRating: this.props.currentRating
        // this.state.currentRating used to generate value that assigns the visual number of yellow stars, as well as what is sent to state and firebase.
        };
    }

    componentDidMount() {
        this.setRating();
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
        this.setState({ 
            currentRating: rating 
        }, () => {
            this.props.starRatingFuncProp(this.state.currentRating)
        }); // set state so the rating stays highlighted
    }


    handleKeyPress = (event) => {
    if(event.key === 'Enter'){
        let rating = event.target.dataset.value;
        this.setState({ 
            currentRating: rating 
        }, () => {
            this.props.starRatingFuncProp(this.state.currentRating)
        }); // set state so the rating stays highlighted
    } 
    this.setRating();
    }


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
                value={n + 1}
                onMouseOver={this.hoverHandler}
                onClick={this.starClickHandler}
                onKeyDown={ this.handleKeyPress } 
                tabIndex= { 0 }
                aria-label="star for user rating"
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
