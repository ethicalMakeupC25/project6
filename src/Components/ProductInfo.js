import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ReviewParent from './ReviewParent';
// Router required, even though they're not technically used in the code itself.


class ProductInfo extends Component {
  constructor() {
    super();

    this.state = {
      maxLength: 250
    }
  }

  render() {
    return (
      <Fragment>
        <div className="productInfo">
          <h2>{this.props.product.name}</h2>
          <p>
            {this.props.product.description.length > this.state.maxLength ? (
              <Fragment>
                {`${this.props.product.description.substring(
                  0,
                  this.state.maxLength
                )}... `}
                <span className="infoLink">
                  <a
                    href={this.props.product.product_link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Product Page
                  </a>
                </span>
              </Fragment>
            ) : (
              <Fragment>
                {this.props.product.description}
                <span className="infoLink">
                  <a
                    href={this.props.product.product_link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Product Page
                  </a>
                </span>
              </Fragment>
            )}
          </p>
          <h3>Colors:</h3>
          <div className="productColors">
            {this.props.product.product_colors.length === 0 ? (
              <p>No colors available.</p>
            ) : (
              this.props.product.product_colors.map(color => {
                return (
                  <span
                    key={color.colour_name}
                    aria-label={color.colour_name}
                    style={{ background: color.hex_value }}
                    title={color.colour_name}
                  ></span>
                );
              })
            )}
          </div>
        </div>
        <Route
          path="/project6/products/:productID/review"
          exact
          render={() => (
            <ReviewParent
              user={this.props.user}
              activeID={this.props.activeID}
              isWriting={this.props.isWriting}
              toggleReadReview={this.props.toggleReadReview}
            />
          )}
        />
      </Fragment>
    );
  }
}

export default ProductInfo;