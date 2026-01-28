import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity, clearCart } from './CartSlice';

export default function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items || []);

  // Calculate subtotal for a single item
  const calculateItemSubtotal = (item) => {
    // item.cost expected like "$15" or "$15.00"
    const unit = parseFloat(String(item.cost).substring(1)) || 0;
    return unit * (item.quantity || 0);
  };

  // Calculate total amount for all items
  const calculateTotalAmount = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += calculateItemSubtotal(item);
    });
    return total;
  };

  const handleContinueShopping = (e) => {
    e && e.preventDefault && e.preventDefault();
    if (typeof onContinueShopping === 'function') onContinueShopping(e);
  };

  const handleCheckoutShopping = (e) => {
    e && e.preventDefault && e.preventDefault();
    alert('Functionality to be added for future reference');
  };

  const handleIncrement = (item) => {
    // dispatch updateQuantity with +1
    dispatch(updateQuantity({ name: item.name, quantity: (item.quantity || 0) + 1 }));
  };

  const handleDecrement = (item) => {
    const currentQty = item.quantity || 0;
    if (currentQty > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: currentQty - 1 }));
    } else {
      // if decrement would drop to 0, remove the item
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const totalAmount = calculateTotalAmount();

  return (
    <div className="cart-container" style={{ padding: '20px' }}>
      <h2>Total Cart Amount: ${totalAmount.toFixed(2)}</h2>

      {cartItems.length === 0 ? (
        <div>
          <p>Your cart is empty.</p>
          <button onClick={handleContinueShopping}>Continue Shopping</button>
        </div>
      ) : (
        <div>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {cartItems.map((item, idx) => (
              <li key={idx} style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '18px', borderBottom: '1px solid #eee', paddingBottom: '12px' }}>
                <img src={item.image} alt={item.name} style={{ width: 90, height: 90, objectFit: 'cover', borderRadius: 6 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600 }}>{item.name}</div>
                  <div style={{ color: '#555' }}>{item.cost}</div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button aria-label={`decrement ${item.name}`} onClick={() => handleDecrement(item)} style={{ padding: '6px 10px' }}>-</button>
                  <div style={{ minWidth: 28, textAlign: 'center' }}>{item.quantity}</div>
                  <button aria-label={`increment ${item.name}`} onClick={() => handleIncrement(item)} style={{ padding: '6px 10px' }}>+</button>
                </div>

                <div style={{ width: 120, textAlign: 'right' }}>
                  <div style={{ fontWeight: 600 }}>Total:</div>
                  <div>${calculateItemSubtotal(item).toFixed(2)}</div>
                </div>

                <div>
                  <button aria-label={`remove ${item.name}`} onClick={() => handleRemove(item)} style={{ background: 'transparent', border: '1px solid #e74c3c', color: '#e74c3c', padding: '6px 10px', borderRadius: 4 }}>
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div style={{ marginTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={handleContinueShopping} style={{ padding: '8px 12px' }}>Continue Shopping</button>
              <button onClick={handleCheckoutShopping} style={{ padding: '8px 12px' }}>Checkout</button>
              <button onClick={handleClearCart} style={{ padding: '8px 12px', background: '#f44336', color: '#fff', border: 'none' }}>Clear Cart</button>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 18, fontWeight: 700 }}>Grand Total</div>
              <div style={{ fontSize: 16 }}>${totalAmount.toFixed(2)}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
