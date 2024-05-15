import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const { id, pricer, size, weight, title, imageUrl, selectedSizeValue, selectedWeightValue, } = action.payload;
      const existingItem = state.items.find(
        (item) => item.id === id && item.size === size && item.weight === weight,
      );

      if (existingItem) {
        existingItem.count++;
      } else {
        state.items.push({
          id,
          title,
          pricer,
          size,
          weight,
          count: 1,
          imageUrl,
          selectedSizeValue,
          selectedWeightValue,
        });
      }

      state.totalPrice = state.items.reduce((sum, item) => {
        return sum + item.pricer * item.count;
      }, 0);
    },
    minusItem(state, action) {
      const { id, size, weight } = action.payload;
      const existingItem = state.items.find(
        (item) => item.id === id && item.size === size && item.weight === weight
      );

      if (existingItem && existingItem.count > 0) {
        if (existingItem.count === 1) {
          const confirmResult = window.confirm('Вы действительно хотите удалить товар?');
          
          if (confirmResult) {
            state.items = state.items.filter(
              (item) =>
                !(item.id === id && item.size === size && item.weight === weight)
            );
          }
        } else {
          existingItem.count--;
        }
      }

      state.totalPrice = state.items.reduce((sum, item) => {
        return sum + item.pricer * item.count;
      }, 0);
    },


    removeItem(state, action) {
      const { id, size, weight } = action.payload;
      state.items = state.items.filter(
        (item) => !(item.id === id && item.size === size && item.weight === weight),
      );

      state.totalPrice = state.items.reduce((sum, item) => {
        return sum + item.pricer * item.count;
      }, 0);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const selectCart = createSelector(
  (state) => state.cart.items,
  (items) => {
    const totalPrice = items.reduce((sum, item) => {
      return sum + item.pricer * item.count;
    }, 0);

    return {
      items,
      totalPrice: isNaN(totalPrice) ? 0 : totalPrice,
    };
  },
);

export const { addItem, minusItem, removeItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
