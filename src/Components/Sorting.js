import React, { Component } from 'react';

class Sorting extends Component {
    constructor() {
        super()

        this.state = {}
    }

    sortingHandle = (e) => {
        const sortDataArray = e.target.value.split('.');
        let isAscending = false;

        if(sortDataArray[1] === 'ascending' || sortDataArray[0] === 'brand') {
            isAscending = true;
        } else {
            isAscending = false;
        }

        const sortData = {
            value: sortDataArray[0],
            ascending: isAscending
        }

        this.props.updateSortBy(sortData);
    }

    render() {
        return (
            <div className='sortContainer'>
                <label htmlFor="sorting">Sort By : </label>

                <select id="sorting" onChange={this.sortingHandle}>
                    <optgroup label="Choose One"></optgroup>
                    <option value="brand" >Alphabetical (by brands)</option>
                    <optgroup label='Ratings'></optgroup>
                    <option value="rating.descending">Rating (Descending)</option>
                    <option value="rating.ascending">Rating (Ascending)</option>
                    <optgroup label='Sort by Price'></optgroup>
                    <option value="price.descending" >Price (Highest)</option>
                    <option value="price.ascending" >Price (Lowest)</option>

                </select>
            </div>
        )
    }
}

export default Sorting;