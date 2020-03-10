import React, { Component } from 'react';
import Search from './Search';
import Results from './Results';
import Coverflow from "react-coverflow";
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import FilterResults from './FilterResults';
import Sorting from './Sorting'
class Main extends Component {
    constructor() {
        super();

        this.state = {
            isSearched: false,
            searchInput: '',
            filteredResults: [],
            originalResults: [],
            sortBy: {
                value: 'brand',
                ascending: true
            }
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

            // OLD SORT LOGIC
            // if (this.state.sortBy === "brand") {
            //     let sortingArray = [...this.props.filteredResults]
            //     sortingArray.sort((a, b) => {
            //         let textA;
            //         if (!a.brand) {
            //             return 1
            //         } else {
            //             textA = a.brand.toUpperCase();
            //         }
            //         let textB;
            //         if (!b.brand) {
            //             return -1
            //         } else {
            //             textB = b.brand.toUpperCase();
            //         }
            //         return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            //     })
            //     this.props.sortUpdate(sortingArray)
            // }
            // if (e.target.value === "originalRatingD") {
            //     let sortingArray = [...this.props.filteredResults]
            //     sortingArray.sort((a, b) => {
            //         let textA = a.rating;

            //         let textB = b.rating;

            //         return (textA < textB) ? 1 : (textA > textB) ? -1 : 0;
            //     })
            //     this.props.sortUpdate(sortingArray)
            // }
            // if (e.target.value === "originalRatingA") {
            //     let sortingArray = [...this.props.filteredResults]
            //     sortingArray.sort((a, b) => {
            //         let textA = a.rating;

            //         let textB = b.rating;

            //         return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            //     })
            //     this.props.sortUpdate(sortingArray)
            // }
            // if (e.target.value === "priceH") {
            //     let sortingArray = [...this.props.filteredResults]
            //     sortingArray.sort((a, b) => {
            //         let textA = parseFloat(a.price);
            //         let textB = parseFloat(b.price);
            //         return (textA < textB) ? 1 : (textA > textB) ? -1 : 0;
            //     })
            //     this.props.sortUpdate(sortingArray)
            // }
            // if (e.target.value === "priceL") {
            //     let sortingArray = [...this.props.filteredResults]
            //     sortingArray.sort((a, b) => {
            //         let textA = parseFloat(a.price);
            //         let textB = parseFloat(b.price);
            //         return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            //     })
            //     this.props.sortUpdate(sortingArray)
            // }
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
            this.setState({
                filteredResults: filterRefinedArray
            })
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
                <Search veganProducts={this.props.veganProducts} handleSearchInput={this.handleSearchInput} />
                <FilterResults updaterefinedItems={this.newResults} />
                <Sorting filteredResults={this.state.filteredResults} updateSortBy = {this.updateSortBy}/>
                {this.state.isSearched ? (
                <Results filteredResults={this.state.filteredResults} />
                ) : null}

                <Coverflow
                width="960"
                height="450"
                displayQuantityOfSide={2}
                navigation={false}
                enableScroll={true}
                clickable={true}
                active={0}
                >
                <div
                    onClick={() => {}}
                    onKeyDown={() => {}}
                    role="menuitem"
                    tabIndex="0"
                >
                    {/* suggest, forEach loop to render each image in a component that holds the below image tags and their attributes. */}
                    <img
                    src={this.props.veganProducts.image_link}
                    alt={this.props.veganProducts.name}
                    style={{
                        display: "block",
                        width: "100%"
                    }}
                    />
                </div>
                <img
                    src="https://s3.amazonaws.com/donovanbailey/products/api_featured_images/000/000/989/original/open-uri20171224-4-1gh72x0?1514082779"
                    alt="title or description"
                    data-action="http://andyyou.github.io/react-coverflow/"
                />
                <img
                    src="https://s3.amazonaws.com/donovanbailey/products/api_featured_images/000/001/048/original/open-uri20180708-4-13okqci?1531093614"
                    alt="title or description"
                    data-action="http://andyyou.github.io/react-coverflow/"
                />
                <img
                    src="https://s3.amazonaws.com/donovanbailey/products/api_featured_images/000/001/042/original/open-uri20180706-4-1e74943?1530916234"
                    alt="title or description"
                    data-action="http://andyyou.github.io/react-coverflow/"
                />
                <img
                    src="https://s3.amazonaws.com/donovanbailey/products/api_featured_images/000/001/035/original/open-uri20180630-4-n6wb0y?1530390383"
                    alt="title or description"
                    data-action="http://andyyou.github.io/react-coverflow/"
                />
                <img
                    src="https://s3.amazonaws.com/donovanbailey/products/api_featured_images/000/001/021/original/open-uri20180630-4-10sgmvz?1530390373"
                    alt="title or description"
                    data-action="http://andyyou.github.io/react-coverflow/"
                />

                </Coverflow>
            </main>
        );
    }
}

export default Main;