import React from 'react';
import './ShoppingProducCard.css';

const ShoppingProductCard = ({ product }) => {
  const {
    brand,
    category,
    description,
    image,
    price,
    saleprice,
    title,
    totalstock,
  } = product;

  return (
    <div className="product-card">
      <img src={image} alt={title} className="product-image" />
      <div className="product-details">
        <h2 className="product-title">{title}</h2>
        <p className="product-brand">Brand: {brand}</p>
        <p className="product-category">Category: {category}</p>
        {/* <p className="product-description">{description}</p> */}
        <div className="product-price">
          <span className="product-price-original">${price}</span>
          {saleprice && (
            <span className="product-price-sale">${saleprice}</span>
          )}
        </div>
        <p className="product-stock">Stock: {totalstock} items</p>
      </div>
    </div>
  );
};

export default ShoppingProductCard;
