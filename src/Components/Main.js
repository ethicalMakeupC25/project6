import React, { Component } from 'react';
import Search from './Search';

class Main extends Component {
    constructor() {
        super();

        this.state = {
            searchInput: ''
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