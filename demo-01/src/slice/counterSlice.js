import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: state => { state.value += 1 },
    deCrement: state => { state.value -= 1 },
    xxx: (state, action) => { state.value += action.payload }
  }
});

export const { increment, deCrement, xxx } = counterSlice.actions;
export default counterSlice; 