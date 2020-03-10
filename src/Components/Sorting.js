import React, { Component } from 'react';

class Sorting extends Component {
    constructor() {
        super()

        this.state = {
            sortingArray: [],
        }
    }



    sortingHandle = (e) => {
        if (this.props.filteredResults.length !== 0) {
            if (e.target.value === "brand") {
                let sortingArray = [...this.props.filteredResults]
                sortingArray.sort((a, b) => {
                    let textA;
                    if (!a.brand) {
                        return 1
                    } else {
                        textA = a.brand.toUpperCase();
                    }
                    let textB;
                    if (!b.brand) {
                        return -1
                    } else {
                        textB = b.brand.toUpperCase();
                    }
                    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                })
                this.props.sortUpdate(sortingArray)
            }
            if (e.target.value === "originalRatingD") {
                let sortingArray = [...this.props.filteredResults]
                sortingArray.sort((a, b) => {
                    let textA = a.rating;

                    let textB = b.rating;

                    return (textA < textB) ? 1 : (textA > textB) ? -1 : 0;
                })
                this.props.sortUpdate(sortingArray)
            }
            if (e.target.value === "originalRatingA") {
                let sortingArray = [...this.props.filteredResults]
                sortingArray.sort((a, b) => {
                    let textA = a.rating;

                    let textB = b.rating;

                    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                })
                this.props.sortUpdate(sortingArray)
            }
            if (e.target.value === "priceH") {
                let sortingArray = [...this.props.filteredResults]
                sortingArray.sort((a, b) => {
                    let textA = parseFloat(a.price);
                    let textB = parseFloat(b.price);
                    return (textA < textB) ? 1 : (textA > textB) ? -1 : 0;
                })
                this.props.sortUpdate(sortingArray)
            }
            if (e.target.value === "priceL") {
                let sortingArray = [...this.props.filteredResults]
                sortingArray.sort((a, b) => {
                    let textA = parseFloat(a.price);
                    let textB = parseFloat(b.price);
                    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                })
                this.props.sortUpdate(sortingArray)
            }
        }
    }

    render() {
        return (
            <div className='sortContainer'>
                <label htmlFor="sorting">Sort By : </label>

                <select id="sorting" onChange={this.sortingHandle}>
                    <option value="">Choose one</option>
                    <option value="brand" >Alphabetical (by brands)</option>
                    <optgroup label='Ratings'></optgroup>
                    <option value="originalRatingD" >(Descending)</option>
                    <option value="originalRatingA" >(Ascending)</option>
                    <optgroup label='Sort by Price'></optgroup>
                    <option value="priceH" >(Highest)</option>
                    <option value="priceL" >(Lowest)</option>

                </select>
            </div>
        )
    }
}

export default Sorting;