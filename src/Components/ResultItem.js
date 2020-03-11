import React, { Component, Fragment } from 'react';
import ProductImage from './ProductImage';
import ProductInfo from './ProductInfo';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
// React-router-dom required, even though not used in code.

class ResultItem extends Component {
  constructor() {
    super();

    // max length for product description
    this.state = {
      isWriting: false
    }
  }

  toggleReadReview = () => {
    this.setState({isWriting: !this.state.isWriting});
  }

  render() {
    return (
      <Fragment>

        <div className={`result ${this.props.activeID === this.props.product.id && "selected"}`} >
          <ProductImage product={this.props.product} setActiveID={this.props.setActiveID}/>
          {this.props.activeID === this.props.product.id && 
          <ProductInfo 
          isWriting={this.state.isWriting} 
          toggleReadReview={this.toggleReadReview} 
          product={this.props.product} 
          activeID={this.props.activeID} 
          user={this.props.user}
          userCheck={this.props.userCheck}/>}

        </div>
      </Fragment>
    );
  }
}

export default ResultItem;