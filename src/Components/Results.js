import React, { Component } from 'react';
import ResultItem from './ResultItem';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
// React-router-dom required, even though not used in code.


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
            <ResultItem 
              key={product.id} 
              setActiveID={this.setActiveID} 
              activeID={this.state.activeID} 
              product={product} 
              user={this.props.user}
              userCheck={this.props.userCheckProps}/>
          );
        })}
      </section>
    )
  }
}

export default Results;