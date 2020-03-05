import React, { Component } from 'react';
import Search from './Search';
import Results from './Results'

class Main extends Component {
    constructor() {
        super();

        this.state = {
            isSearched: false,
            searchInput: ''
        }
    }

    setSearched = () => {
        this.setState({isSearched: true})            
        }
    }

    handleSearchInput = (input) => {
        this.setState({
            searchInput: input
        })
    }

    render() {
        return (
            <main className="wrapper">
                <Search veganProducts={this.props.veganProducts} handleSearchInput={this.handleSearchInput} />
                
            </main>
        )
    }
}

export default Main;