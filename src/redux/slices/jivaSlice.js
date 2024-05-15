import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchJivas = createAsyncThunk('jiva/fetchJivasStatus', async (params) => {
  const { sortBy, order, category } = params;
  const { data } = await axios.get(
    `https://6566ee3064fcff8d730f5568.mockapi.io/item?${category}&sortBy=${sortBy}&order=${order}`,
  );
  return data;
});

const initialState = {
  items: [],
  status: 'loading',
};

export const jivaSlice = createSlice({
  name: 'jiva',
  initialState,
  reducers: {
    setItem(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
       .addCase(fetchJivas.pending, (state) => {
          state.status = "loading"
          state.items = []
       })
       .addCase(fetchJivas.fulfilled, (state, action) => {
          state.items = action.payload
          state.status = "success"
       })
       .addCase(fetchJivas.rejected, (state) => {
          state.status = "error"
          state.items = []
       })
 }
});

export const selectJivaData = (state) => state.jiva;

export const { setItem } = jivaSlice.actions;

export default jivaSlice.reducer;
