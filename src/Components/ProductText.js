import React, { Component } from 'react';

class ProductText extends Component {
  constructor() {
    super();

    this.state = {}
  }

  render() {
    return (
      <div className="productTextContainer">
        <div className="productText">
          <h2 className="visuallyHidden">{this.props.product.name}</h2>
          <p>Brand: {!this.props.product.brand ? "Not Available" : this.props.product.brand}</p>
          <p>Price: {
            this.props.product.price === "0.0" ? "Not Available" : parseInt(this.props.product.price).toFixed(2)
          }</p>
          <p>Rating: {!this.props.product.rating ? "Not Rated" : `${this.props.product.rating}/5`}</p>
        </div>
      </div>
    );
  }
}

export default ProductText;