import React, { Component, Fragment } from 'react';
import ProductImage from './ProductImage';
import ProductInfo from './ProductInfo';

class ResultItem extends Component {
  constructor() {
    super();

    // max length for product description
    this.state = {
      isWriteReview: true
    }
  }

  toggleReadReview = () => {
    this.setState({isWriteReview: !this.state.isWriteReview})
  }

  render() {
    return (
      <Fragment>
        <div className={`result ${this.props.activeID === this.props.product.id && "selected"}`} key={this.props.product.id}>
          <ProductImage product={this.props.product} setActiveID={this.props.setActiveID}/>
          {this.props.activeID === this.props.product.id && <ProductInfo product={this.props.product} activeID={this.props.activeID}/>}
        </div>
      </Fragment>
    );
  }
}

export default ResultItem;