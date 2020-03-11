import React, { Component, Fragment } from 'react';
import Search from './Search';
import Results from './Results';
import Carousel from './Carousel';
import { Route, Link, Switch, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import FilterResults from './FilterResults';
import Sorting from './Sorting';
import Wishlist from './Wishlist';
import UserReviews from './UserReviews';

const customHistory = createBrowserHistory();

class Main extends Component {
    constructor() {
        super();

        this.state = {
            searchInput: '',
            filteredResults: [],
            originalResults: [],
            sortBy: {
                value: 'brand',
                ascending: true
            },
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

    sortArray = (arrayToSort) => {
        // Only sort arrays with content
        if (arrayToSort.length !== 0) {
            // spread the passed array so we can work with it
            let sortingArray = [...arrayToSort];

            sortingArray.sort((productA, productB) => {
                // sortBy is an object that contains the values of the the user's choice
                let productAValue = productA[this.state.sortBy.value];
                let productBValue = productB[this.state.sortBy.value];
                let returnValue;

                // return value determines sorting order
                if(this.state.sortBy.ascending) {
                    returnValue = 1;
                } else {
                    returnValue = -1;
                }

                // The next 2 if conditions determine what we should do with the values
                // if value is null then return
                // if it's not a number when parsed, turn it to uppercase
                // if it's a number parse it to a float
                if (!productAValue) {
                    return -returnValue;
                } else if(isNaN(parseInt(productAValue))) {
                    productAValue = productAValue.toUpperCase();
                } else {
                    productAValue = parseFloat(productAValue);
                }

                if (!productBValue) {
                    return returnValue;
                } else if(isNaN(parseInt(productBValue))) {
                    productBValue = productBValue.toUpperCase();
                } else {
                    productBValue = parseFloat(productBValue);
                }

                return (productAValue < productBValue) ? -returnValue : (productAValue > productBValue) ? returnValue : 0;
            });

            return sortingArray;
        }
    }

    filterResults = () => {
        const filteredArray = this.props.veganProducts.filter(product => {
            return product.product_type === this.state.searchInput || product.name === this.state.searchInput || product.brand === this.state.searchInput;
        });
        const sortedArray = this.sortArray(filteredArray);
        this.setState({
            filteredResults: sortedArray,
            originalResults: filteredArray
        }, () => {
            customHistory.push('/project6/products');
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
                            if (!filterRefinedArray.includes(eachProduct)) {
                                filterRefinedArray.push(eachProduct)
                            }
                        };
                    })
                })
            })
            const sortedRefinedArray = this.sortArray(filterRefinedArray);
            if(sortedRefinedArray){
                this.setState({
                    filteredResults: sortedRefinedArray
                })
            } else {
                this.setState({
                    filteredResults: filterRefinedArray
                })
            }
            
        } else {
            this.setState({
                filteredResults: this.state.originalResults
            })
        }
        // console.log(this.state.originalResults)
    }

    updateSortBy = (option) => {
        this.setState({
            sortBy: option
        }, () => {
            const sortedArray = this.sortArray(this.state.filteredResults);
            this.setState({
                filteredResults: sortedArray
            });
        });
    }

    render() {
        
        return (
            <main className="wrapper">
                <Switch>
                    <Route path="/project6/" exact>
                        {
                            this.state.isSearched
                            ?
                            <Redirect to="/project6/products" />
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
                    <Route path="/project6/products">
                        <Search
                            veganProducts={this.props.veganProducts}
                            handleSearchInput={this.handleSearchInput}
                        />
                        <FilterResults updaterefinedItems={this.newResults} />
                        <Sorting filteredResults={this.state.filteredResults} updateSortBy = {this.updateSortBy}/>
                        <Results filteredResults={this.state.filteredResults} user={this.props.user} />
                    </Route>
                    <Route path="/project6/wishlist">
                        <Wishlist user={this.props.user} veganProducts={this.props.veganProducts} />
                    </Route>
                    <Route path="/project6/reviews">
                        <UserReviews />
                    </Route>
                </Switch>
            </main>
        );
    }
}

export default Main;