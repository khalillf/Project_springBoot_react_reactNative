
import React from 'react';

function BuyButton({ basket, onBuy }) {
  const calculateTotal = () => {
    return basket.reduce((total, product) => total + product.price, 0);
  };

  const handleBuy = () => {
    
    const order = {
      products: basket.map((product) => product.id), 
      totalAmount: calculateTotal(),
      
    };

    
    onBuy(order);
  };

  return (
    <button onClick={handleBuy} className="buy-button">
      Buy
    </button>
  );
}

export default BuyButton;
