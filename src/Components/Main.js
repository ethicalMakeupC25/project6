import React, { Component, Fragment } from 'react';
import Search from './Search';
import Results from './Results';
import Carousel from './Carousel';
import { Route, Link, Switch, Redirect } from 'react-router-dom';
import FilterResults from './FilterResults';

class Main extends Component {
    constructor() {
        super();

        this.state = {
            searchInput: '',
            filteredResults: [],
            originalResults: [],
            isSearched: false
        }
    }

    handleSearchInput = (input) => {
        this.setState({
            searchInput: input,
            isSearched: true
        }, this.filterResults)
    }

    componentDidMount() {
        console.log('arrayWithProducts', this.props.veganProducts)
        console.log('original',this.state.originalResults)
    }

    filterResults = () => {
        const filteredArray = this.props.veganProducts.filter(product => {
            return product.product_type === this.state.searchInput || product.name === this.state.searchInput || product.brand === this.state.searchInput;
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
        console.log(this.state.originalResults)
    }


    render() {
        return (
            <main className="wrapper">
                <Switch>
                    <Route path="/" exact>
                        {
                            this.state.isSearched
                            ?
                            <Redirect to="/products" />
                            :
                            <Fragment>
                                <Search
                                    veganProducts={this.props.veganProducts}
                                    handleSearchInput={this.handleSearchInput}
                                />
                                <Carousel veganProducts={this.props.veganProducts}/>
                            </Fragment>
                        }
                    </Route>
                    <Route path="/products">
                        <Search
                            veganProducts={this.props.veganProducts}
                            handleSearchInput={this.handleSearchInput}
                        />
                        <FilterResults updaterefinedItems={this.newResults} />
                        {/* sorting component here */}
                        <Results filteredResults={this.state.filteredResults} />
                    </Route>
                    <Route path="/wishlist">
                        {/* wishlist component goes here */}
                    </Route>
                    <Route path="/reviews">
                        {/* user reviews goes here */}
                    </Route>
                </Switch>

            </main>
        );
    }
}

export default Main;