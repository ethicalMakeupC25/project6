import React, { Component, Fragment } from 'react';
import Search from './Search';
import Results from './Results';
import Carousel from './Carousel';
import { Route, Switch, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import FilterResults from './FilterResults';
import Sorting from './Sorting';
import Wishlist from './Wishlist';
import UserReviews from './UserReviews';
import RedirectPage from './Redirect';


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
        const validateInput = input.toLowerCase();

        this.setState({
            searchInput: validateInput,
            isSearched: true
        }, this.filterResults)
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
        //called from handleSearchInput() after searchInput state has been updated
        //create an empty filteredArray
        let filteredArray = [];
        //assign filtered veganProducts return to filteredArray
        filteredArray = this.props.veganProducts.filter(product => {
            const productType = product.product_type ? product.product_type.toLowerCase() : "";
            const productName = product.name ? product.name.toLowerCase() : "";
            const productBrand = product.brand ? product.brand.toLowerCase() : "";
            return productType.includes(this.state.searchInput) || productName.includes(this.state.searchInput) || productBrand.includes(this.state.searchInput);
        });

        //create empty sortedArray
        let sortedArray = [];
        //only sort if there's something there
        if (filteredArray.length > 0) {
            sortedArray = this.sortArray(filteredArray);
        }

        //if sorted, set the new results to state, if not sorted reset empty arrays to state to trigger a render
        if (sortedArray.length > 0) {
            this.setState({
                filteredResults: sortedArray,
                originalResults: sortedArray
            }, () => {
                customHistory.push('/project6/products');
            });
        } else {
            this.setState({
                filteredResults: filteredArray,
                originalResults: filteredArray
            }, () => {
                customHistory.push('/project6/products');
            });
        }
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
                                <Carousel allItemsArray={this.props.veganProducts}/>
                            </Fragment>
                        }
                    </Route>
                    <Route path="/project6/products">
                        <Search
                            veganProducts={this.props.veganProducts}
                            handleSearchInput={this.handleSearchInput}
                        />

                        <FilterResults updaterefinedItems={this.newResults} />

                        <Sorting
                            filteredResults={this.state.filteredResults}
                            updateSortBy= {this.updateSortBy}
                        />

                        <Results 
                            filteredResults={this.state.filteredResults} 
                            user={this.props.user} 
                            />

                    </Route>
                    <Route exact path="/project6/wishlist">
                        {
                            this.props.user
                                ?
                                <Wishlist user={this.props.user} veganProducts={this.props.veganProducts}/>
                                :
                                <Redirect to="/project6/" />
                        }
                    </Route>
                    <Route exact path="/project6/reviews">
                        {
                            this.props.user
                                ?
                                <UserReviews
                                    user={this.props.user}
                                    veganProducts={this.props.veganProducts}
                                />
                                :
                                <Redirect to="/project6/" />
                        }
                    </Route>

                    <Route
                        path="/project6"
                        component={ RedirectPage }
                        loc="https://ethicalmakeupc25.github.io/project6/"
                        />
                </Switch>
            </main>
        );
    }
}

export default Main;