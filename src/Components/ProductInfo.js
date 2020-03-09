import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import ReviewParent from './ReviewParent';

class ProductInfo extends Component {
  constructor() {
    super();

    this.state = {
      maxLength: 250
    }
  }

  render() {
    return (
      <div className="productInfo">
        <h2>{this.props.product.name}</h2>
        <p>{this.props.product.description.length > this.state.maxLength ?
          <Fragment>
            {`${this.props.product.description.substring(0, this.state.maxLength)}... `}
            <span className="infoLink"><a href={this.props.product.product_link} target="_blank">Product Page</a></span>
          </Fragment>
          : <Fragment>
            {this.props.product.description}
            <span className="infoLink"><a href={this.props.product.product_link} target="_blank">Product Page</a></span>
          </Fragment>}</p>
        <h3>Colors:</h3>
        <div className="productColors">
          {this.props.product.product_colors.length === 0 ? <p>No colors available.</p> :
            this.props.product.product_colors.map((color) => {
              return (
                <span key={color.colour_name} aria-label={color.colour_name} style={{ background: color.hex_value }} title={color.colour_name}></span>
              )
            })}
        </div>
      <Route path="/products/:productID/review" exact render={() => <ReviewParent isWriteReview={this.state.isWriteReview} />} />
      </div>
    );
  }
}

export default ProductInfo;