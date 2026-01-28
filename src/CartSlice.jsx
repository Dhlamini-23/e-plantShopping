import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [] // each item: { name, image, cost, quantity }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;
      const existingItem = state.items.find(item => item.name === name);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ name, image, cost, quantity: 1 });
      }
    },

    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.name !== action.payload);
    },

    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const itemToUpdate = state.items.find(item => item.name === name);
      if (itemToUpdate) {
        const newQty = Number(quantity);
        if (Number.isFinite(newQty) && newQty > 0) {
          itemToUpdate.quantity = Math.floor(newQty);
        } else {
          state.items = state.items.filter(item => item.name !== name);
        }
      }
    },

    clearCart: (state) => {
      state.items = [];
    }
  }
});

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
