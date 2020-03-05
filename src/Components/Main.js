import React, { Component } from 'react';
import Search from './Search';
import Results from './Results'

class Main extends Component {
    constructor() {
        super();

        this.state = {
            isSearched: false
        }
    }

    setSearched = () => {
        this.setState({isSearched: true})
    }

    render() {
        return (
            <main className="wrapper">
                <Search veganProducts={this.props.veganProducts} />
                <Results veganProducts={this.props.veganProducts} />
            </main>
        )
    }
}

export default Main;