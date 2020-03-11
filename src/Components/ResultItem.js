import React, { Component, Fragment } from 'react';
import ProductImage from './ProductImage';
import ProductInfo from './ProductInfo';

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
        <div className={`result ${this.props.activeID === this.props.product.id && "selected"}`} key={this.props.product.id}>
          <ProductImage 
          product={this.props.product} 
          setActiveID={this.props.setActiveID} 
          addToWishlist={this.props.addToWishlist}
          />
          {this.props.activeID === this.props.product.id && <ProductInfo isWriting={this.state.isWriting} toggleReadReview={this.toggleReadReview} product={this.props.product} activeID={this.props.activeID}/>}
        </div>
      </Fragment>
    );
  }
}

export default ResultItem;