import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import AutosuggestHighlightMatch from 'autosuggest-highlight/match';
import AutosuggestHighlightParse from 'autosuggest-highlight/parse';
import Swal from 'sweetalert2';
// all functions below related to suggestions has been adapted from https://www.npmjs.com/package/react-autosuggest and https://codepen.io/moroshko/pen/PZWbzK

class Search extends Component {
    constructor() {
        super();

        //initialize state
        this.state = {
            //to handle value of user search input
            value: '',
            //to handle all suggestions produced by autosuggest
            suggestions: [],
            //to handle all suggestions produced by original veganProducts array
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

    //escape special characters for search
    escapeRegexCharacters = (str) => {
        //escaped everything but '.' because of a common search result: 'e.l.f.'
        return str.replace(/[*+?^${}()|[\]\\]/g, '\\$&');
    }

    //this function teaches autosuggest how to calculate suggestions for any given input value
    getSuggestions = (value) => {
        //pass value into escapeRegexCharacters function to remove characters, also trim white space, and set to lowercase
        const escapedValue = this.escapeRegexCharacters(value.trim().toLowerCase());

        //if there's no user input, return empty array
        if (escapedValue === '') {
            return [];
        }

        //create regex based on processed input
        const regex = new RegExp('\\b' + escapedValue, 'i');

        //return filtered suggestionsOptions array by applying a regex test
        return this.state.suggestionsOptions.filter(suggestion => regex.test(this.getSuggestionValue(suggestion)));
    }

    //when suggestion is clicked, autosuggest needs to populate input based on clicked suggestion
    //this function teaches autosuggest how to calculate the input value for every given suggestion
    getSuggestionValue = suggestion => suggestion;

    //render the list of suggestions
    renderSuggestion = (suggestion, { query }) => {
        const suggestionText = suggestion;
        const matches = AutosuggestHighlightMatch(suggestionText, query);
        const parts = AutosuggestHighlightParse(suggestionText, matches);

        //render the list and apply class of highlight to parts that match input
        return (
            <span className={'suggestion-content '}>
                <span className="suggestion">
                    {   
                        //this produces spans around everything that needs to be highlighted
                        parts.map((part, index) => {
                            const className = part.highlight ? 'highlight' : null;
        
                            return (
                                <span className={className} key={index}>{part.text}</span>
                            );
                        })
                    }
                </span>
            </span>
        );
    };

    //handle change on input and save to state
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

    //when searchbar suggestion is clicked on instead of submitted via enter, acts as handle change and calls submit handler
    onSuggestionSelected = (e, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
        e.preventDefault();
        this.setState({
            value: suggestionValue
        }, () => {this.handleSubmit(e)})
    }

    //locally resolve submit and then pass to parent component
    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.value) {
            //call parent function and pass value up
            this.props.handleSearchInput(this.state.value);
            //clear state
            this.setState({
                value: ''
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'You may want to search for something first!'
            })
        }
    }

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
                <form onSubmit={(e) => {this.handleSubmit(e)}}>
                    <label htmlFor="productSearch">Search for vegan makeup by type, name or brand.</label>
                    <Autosuggest 
                        suggestions={suggestions.slice(0, 5)}
                        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                        getSuggestionValue={this.getSuggestionValue}
                        onSuggestionSelected={this.onSuggestionSelected}
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