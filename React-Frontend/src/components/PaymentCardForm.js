import React, { useState, useEffect } from 'react';
import '../css/AddProductComponent.css';
function PaymentCardForm({ onSubmit }) {
  const [cardholderName, setCardholderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [securityCode, setSecurityCode] = useState('');
  const storedId = localStorage.getItem('id');

  useEffect(() => {
    
    if (storedId) {
      fetch(`http://localhost:8080/api/payment-cards`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
          if (data.id_user === storedId) { 
            console.log(data.id_user);
            console.log(storedId);
            setCardholderName(data.cardholderName);
            setCardNumber(data.cardNumber);
            setExpirationDate(data.expirationDate);
            setSecurityCode(data.securityCode);
          }
        })
        .catch((error) => {
          console.error('Error fetching payment card:', error);
        });
    }
  }, [storedId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const paymentCard = {
      cardholderName,
      cardNumber,
      expirationDate,
      securityCode,
    };
    onSubmit(paymentCard);
  };

  return (
    <div className="container form" >
    <form className="container form" onSubmit={handleSubmit}>
        <div className="form-group">
            <label>Cardholder Name</label>
            <input
                type="text"
                value={cardholderName}
                onChange={(e) => setCardholderName(e.target.value)}
            />
        </div>
        <div className="form-group">
            <label>Card Number</label>
            <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
            />
        </div>
        <div className="form-group">
            <label>Expiration Date</label>
            <input
                type="date"
                value={expirationDate}
                onChange={(e) => setExpirationDate(e.target.value)}
            />
        </div>
        <div className="form-group">
            <label>Security Code</label>
            <input
                type="text"
                value={securityCode}
                onChange={(e) => setSecurityCode(e.target.value)}
            />
        </div>
        <button type="submit">Add</button>
    </form>
</div>

  );
}

export default PaymentCardForm;
