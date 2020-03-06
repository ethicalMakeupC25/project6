import React, { Component } from 'react';
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
              return(
                <div key={product.id}>
                  <div className="productImage">
                    <img src={product.api_featured_image} alt={product.name}/>
                    <div className="productTextContainer">
                      <div className="productText">
                        <h3>{product.name}</h3>
                        <p>Brand: {product.brand}</p>
                        <p>Price: {parseInt(product.price).toFixed(2)}</p>
                        <p>Rating: {!product.rating ? "Not rated" : `${product.rating}/5`}</p>
                      </div>
                    </div>
                    <Link to={`/products/${product.id}`}>Reviews</Link>
                  </div>
                </div>
              );
            })}
          </section>
      )
  }
}

export default Results;