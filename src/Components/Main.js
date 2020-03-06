import React, { Component } from 'react';
import Search from './Search';
import Results from './Results';

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
                {this.state.isSearched ? <Results filteredResults={this.state.filteredResults} /> : null}

            </main>
        )
    }
}

export default Main;