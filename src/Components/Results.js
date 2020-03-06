import React, { Component } from 'react';
import ResultItem from './ResultItem';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class Results extends Component {
  constructor() {
    super();

    this.state = {
      activeID: null
    }
  }

  setActiveID = (e, id) => {
    this.setState({activeID: id});
  }

  render() {
    return (
      <section className="results">
        {this.props.filteredResults.map(product => {
          return (
            <ResultItem setActiveID={this.setActiveID} activeID={this.state.activeID} product={product} />
          );
        })}
      </section>
    )
  }
}

export default Results;