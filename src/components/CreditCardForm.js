import React, { useState } from 'react';
import NavBar from './NavBar';
import './CreditCardForm.css';

function CreditCardForm() {
  const [cardNumber, setCardNumber] = useState('');
  const [name, setName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [message, setMessage] = useState('');

  const formatCardNumber = (value) => {
    return value
      .replace(/\D/g, '')
      .slice(0, 16)
      .replace(/(.{4})/g, '$1 ')
      .trim();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formatted = formatCardNumber(cardNumber);
    if (formatted.length !== 19) {
      setMessage('Invalid card number format.');
      return;
    }

    const cardData = {
      cardNumber: formatted,
      name,
      expiry,
      cvv,
    };

    localStorage.setItem('creditCard', JSON.stringify(cardData));
    setMessage('Card saved successfully!');
  };

  return (
    <div className="credit-card-container">
      <NavBar />
      <h2>Enter Payment Details</h2>
      <form onSubmit={handleSubmit}>
        <label>Card Number</label>
        <input
          type="text"
          value={cardNumber}
          onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
          placeholder="1234 5678 9012 3456"
        />

        <label>Name on Card</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="John Doe"
        />

        <label>Expiry Date</label>
        <input
          type="text"
          value={expiry}
          onChange={(e) => setExpiry(e.target.value)}
          placeholder="MM/YY"
        />

        <label>CVV</label>
        <input
          type="text"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
          placeholder="123"
        />

        <button type="submit">Save Card</button>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
}

export default CreditCardForm;