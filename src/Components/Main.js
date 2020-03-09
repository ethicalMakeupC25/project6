import React, { Component } from 'react';
import Search from './Search';
import Results from './Results';
import ResultDetails from './ResultDetails'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class Main extends Component {
    constructor() {
        super();

        this.state = {
            isSearched: false,
            searchInput: '',
            filteredResults: []
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

        this.setState({
            filteredResults: filteredArray
        });
    }

    render() {
        return (
            <main className="wrapper">
                <Search veganProducts={this.props.veganProducts} handleSearchInput={this.handleSearchInput} />
                <Route path="/products/:productID" render={() => <ResultDetails filteredResults={this.props.filteredResults} />} />
                {this.state.isSearched ? <Results filteredResults={this.state.filteredResults} /> : null}
            </main>
        )
    }
}

export default Main;