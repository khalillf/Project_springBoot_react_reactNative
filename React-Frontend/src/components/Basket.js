import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../css/Basket.css';
import BuyButton from './BuyButton';
import userService from '../services/UserService'; 
import PaymentCardForm from './PaymentCardForm'
function Basket({ basket, removeFromBasket, loggedIn, onLogout }) {
  const [orderStatus, setOrderStatus] = useState(null);
  const [userId, setUserId] = useState(null);
  const [showPaymentCardForm, setShowPaymentCardForm] = useState(false);
  useEffect(() => {
  
    if (loggedIn) {
      const username = localStorage.getItem('username'); 
      userService
        .getUserByUsername(username)
        .then((userData) => {
          setUserId(userData.data.id); 
        })
        .catch((error) => {
          console.error('Error fetching user:', error);
        });
    }
  }, [loggedIn]);

 
  const calculateTotal = () => {
    return basket.reduce((total, product) => total + product.price, 0);
  };

  const handleBuy = () => {
    
    if (!loggedIn || !userId) {
      console.error('User not logged in or user ID not available.');
      return;
    }
  
    
    const order = {
      userId: userId,
      products: basket.map((product) => product.id), 
      orderDate: new Date(),
      totalAmount: calculateTotal(),
   
    };
  
    
    console.log('Sending order data:', order);
  
    fetch('http://localhost:8080/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    })
      .then((response) => response.json())
      .then((data) => {
        setOrderStatus(`Order ID: ${data.id}`);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleAddPaymentCard = (paymentCard) => {
    const storedId = localStorage.getItem('id');
    paymentCard.id_user = storedId;
   
    fetch('http://localhost:8080/api/payment-cards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentCard),
    })
      .then((response) => response.json())
      .then((data) => {
        
        console.log('Payment Card Added:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  
  

  return (
    <div>
      <div className="basket-container">
        <h2>Panier</h2>
        {basket.map((product, index) => (
          <div className="basket-item" key={index}>
            <img src={`data:image/jpeg;base64,${product.photoData}`} alt={product.name} />
            <div>
              <h3>{product.name}</h3>
              <p>Price: {product.price} DHs</p>
            </div>
            <button className="remove-button" onClick={() => removeFromBasket(index)}>
              Remove
            </button>
          </div>
        ))}
        <div className="total-amount">
          Total: {calculateTotal()} DHs
        </div>
        <BuyButton basket={basket} onBuy={handleBuy} />

        {orderStatus && <p> {orderStatus}</p>}
      </div>
    </div>
  );
}

Basket.propTypes = {
  basket: PropTypes.array.isRequired,
  removeFromBasket: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default Basket;
