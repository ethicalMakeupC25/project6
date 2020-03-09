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
            originalResults: []
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
            filteredResults: filteredArray,
            originalResults: filteredArray
        });
    }

    //When any choice from the from filtering gets checked it triggers the function and pass on the props to as an arguments and populate the array by checking if something from filter selection gets clicked populate filteredResult array with new array else show the original array.
    newResults = (e, refinedCategory) => {
        let filterRefinedArray = [];
        if (refinedCategory.length !== 0) {
            this.state.originalResults.map((eachProduct) => {
                return eachProduct.tag_list.forEach((eachTag) => {
                    refinedCategory.forEach((choice) => {
                        if (choice === eachTag) {
                            if (!filterRefinedArray.includes(eachProduct)){
                                filterRefinedArray.push(eachProduct)
                            }
                        };
                    })
                })
            })
            this.setState({
                filteredResults: filterRefinedArray
            })
        } else {
            this.setState({
                filteredResults: this.state.originalResults
            })
        }

    }


    render() {
        return (
            <main className="wrapper">
                <Search veganProducts={this.props.veganProducts} handleSearchInput={this.handleSearchInput} />
                <FilterResults updaterefinedItems={this.newResults} />
                <Route path="/products/:productID" render={() => <ResultDetails filteredResults={this.props.filteredResults} />} />
                {this.state.isSearched ? <Results filteredResults={this.state.filteredResults} /> : null}
            </main>
        )
    }
}

export default Main;