import { createSlice } from '@reduxjs/toolkit';

const orchidsSlice = createSlice({
  name: 'orchids',
  initialState: { items: [], status: 'idle' },
  reducers: {
    setOrchids: (state, action) => { state.items = action.payload; state.status = 'ready'; },
    addOrchid: (state, action) => { state.items.push(action.payload); },
    updateOrchid: (state, action) => {
      const index = state.items.findIndex((item) => item.id === action.payload.id);
      if (index >= 0) state.items[index] = action.payload;
    },
    removeOrchid: (state, action) => { state.items = state.items.filter((item) => item.id !== action.payload); },
  },
});

export const { setOrchids, addOrchid, updateOrchid, removeOrchid } = orchidsSlice.actions;
export default orchidsSlice.reducer;
