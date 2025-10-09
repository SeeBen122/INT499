import React, { useState, useEffect } from 'react';
import list from '../data/data';
import './Cart.css';
import NavBar from './NavBar';

function Cart() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [error, setError] = useState('');

  // Sync cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Calculate total price
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Helper to detect subscription items
  const isSubscription = (item) => item.service.includes('Subscription');

  // Add item to cart
  const addToCart = (item) => {
    const isSub = isSubscription(item);
    const hasSub = cart.some((i) => isSubscription(i));

    if (isSub && hasSub) {
      setError('Only one subscription item can be added to your cart.');
      return;
    }

    setError('');
    const exists = cart.find((i) => i.id === item.id);
    if (exists) {
      setCart(
        cart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  // Update item quantity
  const updateQuantity = (id, quantity) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: quantity } : item
      )
    );
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
    setError('');
  };

  return (
    <div className="cart-container">
  <NavBar />
  <div className="cart-layout">
    <div className="item-list-section">
      <h2>Available Services</h2>
      <div className="item-list">
        {list.map((item) => (
          <div key={item.id} className="item-card">
            <img src={item.img} alt={item.service} width="80" />
            <h4>{item.service}</h4>
            <p>{item.serviceInfo}</p>
            <p>${item.price.toFixed(2)}</p>
            <button onClick={() => addToCart(item)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>

    <div className="cart-summary">
      <h2>Your Cart</h2>
      {error && <p className="error-message">{error}</p>}
      <ul className="cart-list">
        {cart.map((item) => (
          <li key={item.id}>
            <strong>{item.service}</strong> — ${item.price.toFixed(2)} ×{' '}
            <input
              type="number"
              value={item.quantity}
              min="1"
              onChange={(e) =>
                updateQuantity(item.id, parseInt(e.target.value))
              }
            />
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <h3>Total: ${total.toFixed(2)}</h3>
    </div>
  </div>
</div>
  );
}


export default Cart;