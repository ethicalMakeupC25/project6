import React, { Component } from 'react';
import { HashRouter as Router, Route, Link, useRouteMatch } from 'react-router-dom';
import ProductText from './ProductText';
// Router and Route required for the review buttons, even though they're not technically used in the code itself.

// Custom Link component which hides it if the user has already clicked it
const ReviewLink = (props) => {
  let match = useRouteMatch({
    path: props.to,
    exact: props.activateOnlyWhenExact
  });

  return(
    <div className={match ? "hide" : ""}>
      <Link className="reviewLink" onClick={(e) => props.setActiveID(e, props.product.id)} to={props.to}>{props.label}</Link>
    </div>
  )
}

class ProductImage extends Component {
  constructor() {
    super();

    this.state = {}
  }

  render() {
    return (
      <div className="productImage" id="main">
        {/* Opens detailed product info */}
        <Link to={`/project6/products/${this.props.product.id}`}>
          <img
            onClick={e => this.props.setActiveID(e, this.props.product.id)}
            src={this.props.product.api_featured_image}
            alt={this.props.product.name}
          />
        </Link>

        {/* Text on image */}
        <ProductText 
        product={this.props.product} 
        addToWishlist={this.props.addToWishlist} 
        removeFromWishlist={this.props.removeFromWishlist}/>

        {/* Link that opens review panels */}
        <ReviewLink
          activateOnlyWhenExact={true}
          setActiveID={this.props.setActiveID}
          product={this.props.product}
          to={`/project6/products/${this.props.product.id}/review`}
          label="Reviews"
        />
      </div>
    );
  }
}

export default ProductImage;