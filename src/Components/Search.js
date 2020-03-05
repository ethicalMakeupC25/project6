import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
// all functions below related to suggestions has been adapted from https://www.npmjs.com/package/react-autosuggest and https://codepen.io/moroshko/pen/PZWbzK

class Search extends Component {
    constructor() {
        super();

        this.state = {
            value: '',
            suggestions: [],
            suggestionsOptions: []
        }
    }

    componentDidMount() {
        // pull brands, product types and names for autosuggestions by iterating over veganProducts and pushing brand, product type and name values to an empty array
        const suggestions = [];
        this.props.veganProducts.forEach((dataObject) => {
            //null and undefined is falsy, .: don't push these values
            if (dataObject.brand) {
                suggestions.push(dataObject.brand)
            }
            if (dataObject.product_type) {
                suggestions.push(dataObject.product_type)
                // NOTE TO SELF: NEED TO WASH _ TO SPACES
            }
            if (dataObject.name) {
                suggestions.push(dataObject.name)
            }
        })
        // Set will filter out duplicates from the array
        const suggestionsUnique = [...new Set(suggestions)];

        // update state with processed suggestions from veganProducts
        this.setState({
            suggestionsOptions: suggestionsUnique
        })
    }

    //this function teaches autosuggest how to calculate suggestions for any given input value
    getSuggestions = (value) => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        return inputLength === 0 ? [] : this.state.suggestionsOptions.filter(suggestion => suggestion.toLowerCase().slice(0, inputLength) === inputValue);
    }

    //when suggestion is clicked, autosuggest needs to populate input based on clicked suggestion
    //this function teaches autosuggest how to calculate the input value for every given suggestion
    getSuggestionValue = suggestion => suggestion;

    //render the suggestion
    renderSuggestion = suggestion => (<span>{suggestion}</span>);

    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue
        });
    };

    //store suggestions to state
    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: this.getSuggestions(value)
        });
    };

    //clear state
    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    render() {
        const { value, suggestions } = this.state;

        //set up input attributes here for Autosuggest
        const inputProps = {
            placeholder: 'product type, name or brand',
            value,
            onChange: this.onChange,
            id: 'productSearch'
        }

        return (
            <section className="searchBar">
                <form onSubmit={() => console.log('we are submitting!')}>
                    <label htmlFor="productSearch">Search for vegan makeup by type, name or brand.</label>
                    <Autosuggest 
                        suggestions={suggestions.slice(0, 5)}
                        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                        getSuggestionValue={this.getSuggestionValue}
                        renderSuggestion={this.renderSuggestion}
                        inputProps={inputProps}
                        focusInputOnSuggestionClick={false}
                    />
                </form>
            </section>
        )
    }
}

export default Search;