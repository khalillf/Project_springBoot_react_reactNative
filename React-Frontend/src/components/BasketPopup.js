import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'; 
import '../css/BasketPopup.css';

function BasketPopup({ basket, onClose, removeFromBasket }) {
  
  const total = basket.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="basket-popup">
      <div className="basket-popup-content">
           <h2>Votre panier</h2>
        <ul>
          {basket.map((product, index) => (
            <li key={product.id}>
              <div className="product-fitem">
                <img
                  src={`data:image/jpeg;base64,${product.photoData}`}
                  alt={product.name}
                  className="product-fimage"
                />
                <div className="product-fdetails">
                  <p>{product.name}</p>
                  <p>{product.price} DHs</p>
                </div>
                <button
                  className="remove-button"
                  onClick={() => removeFromBasket(index)}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
        <p>Total: {total} DHs</p>
        <Link to="/basket"> {}
          <button className="buy-button">acheter</button>
        </Link>
        <button onClick={onClose}>Fermer</button>
      </div>
    </div>
  );
}

BasketPopup.propTypes = {
  basket: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
  removeFromBasket: PropTypes.func.isRequired, 
};

export default BasketPopup;
