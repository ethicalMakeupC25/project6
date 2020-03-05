import React, { Component } from 'react';

class Results extends Component {
  render() {
      return (
          <section className="results">
            {this.props.veganProducts.map(product => {
              return(
                <div key={product.id}>
                  <div className="productImage">
                    <img src={product.api_featured_image} alt={product.name}/>
                  </div>
                </div>
              );
            })}
          </section>
      )
  }
}

export default Results;