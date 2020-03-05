import React, { Component } from 'react';
import Search from './Search';

class Main extends Component {
    render() {
        return (
            <main>
                <Search veganProducts={this.props.veganProducts} />
            </main>
        )
    }
}

export default Main;