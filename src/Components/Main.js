import React, { Component } from 'react';
import Search from './Search';
import Results from './Results';
import Coverflow from "react-coverflow";
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
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
                <Search
                veganProducts={this.props.veganProducts}
                handleSearchInput={this.handleSearchInput}
                />
                <FilterResults updaterefinedItems={this.newResults} />
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