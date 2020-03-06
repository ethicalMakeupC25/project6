import React, { Component } from 'react';
import ResultItem from './ResultItem';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class Results extends Component {
  constructor() {
    super();

    this.state = {

    }
  }
  render() {
    return (
      <section className="results">
        {this.props.filteredResults.map(product => {
          return (
            <ResultItem product={product} />
          );
        })}
      </section>
    )
  }
}

export default Results;