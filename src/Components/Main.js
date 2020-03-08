import React, { Component } from 'react';
import Search from './Search';
import Results from './Results';
import ResultDetails from './ResultDetails'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import FilterResults from './FilterResults';

class Main extends Component {
    constructor() {
        super();

        this.state = {
            isSearched: false,
            searchInput: '',
            filteredResults: [],
            refinedItems: [],
        }
    }

    handleSearchInput = (input) => {
        this.setState({
            searchInput: input,
            isSearched: true
        }, this.filterResults)
    }

    componentDidMount() {
        console.log(this.props.veganProducts)
    }

    filterResults = () => {
        const filteredArray = this.props.veganProducts.filter(product => {
            return product.product_type === this.state.searchInput
        });
        // console.log(filteredArray);
        this.setState({
            filteredResults: filteredArray
        });
    }


    newResults = () => {
        this.state.filteredResults.filter(eachItem => {
            // console.log(eachItem.tag_list) 
            console.log (eachItem.tag_list.includes(this.state.refinedItems.toString()))
        });
        console.log(this.state.refinedItems.toString());
        
    }

    updateItems = (e, refinedCategory) => {
        this.setState({
            refinedItems: refinedCategory,
        }, this.newResults)
    }

    render() {
        return (
            <main>
                <Search veganProducts={this.props.veganProducts} handleSearchInput={this.handleSearchInput} />
                <FilterResults updaterefinedItems={this.updateItems} />
                <Route path="/products/:productID" render={() => <ResultDetails filteredResults={this.props.filteredResults} />} />
                {this.state.isSearched ? <Results filteredResults={this.state.filteredResults} /> : null}
            </main>
        )
    }
}

export default Main;