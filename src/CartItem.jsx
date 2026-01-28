import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

export default function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items || []);

  const parseCost = (costStr) => {
    if (typeof costStr === 'number') return costStr;
    return parseFloat(String(costStr).replace(/[^0-9.-]+/g, '')) || 0;
  };

  const calculateItemSubtotal = (item) => {
    return parseCost(item.cost) * (item.quantity || 0);
  };

  const calculateTotalAmount = () => {
    return cartItems.reduce((sum, item) => sum + calculateItemSubtotal(item), 0);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: (item.quantity || 0) + 1 }));
  };

  const handleDecrement = (item) => {
    const qty = item.quantity || 0;
    if (qty > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: qty - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  return (
    <div className="cart-container">
      <h2>Grand Total: ${calculateTotalAmount().toFixed(2)}</h2>

      {cartItems.length === 0 ? (
        <div>
          <p>Your cart is empty.</p>
          <button onClick={onContinueShopping}>Continue Shopping</button>
        </div>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.name} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <img src={item.image} alt={item.name} style={{ width: 80, height: 80, objectFit: 'cover' }} />
              <div style={{ flex: 1 }}>
                <div>{item.name}</div>
                <div>{item.cost}</div>
              </div>

              <div>
                <button onClick={() => handleDecrement(item)}>-</button>
                <span style={{ margin: '0 8px' }}>{item.quantity}</span>
                <button onClick={() => handleIncrement(item)}>+</button>
              </div>

              <div style={{ width: 120, textAlign: 'right' }}>
                <div>${calculateItemSubtotal(item).toFixed(2)}</div>
                <button onClick={() => handleRemove(item)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
