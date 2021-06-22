import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "customerPassword",
  initialState: {
    srv: false,
    server: false,
    mikro: false,
  },
  reducers: {
    setCustomerPasswordState: (state, action) => {
      state[action.payload.key] = action.payload.value;
    },
  },
});

export const { setCustomerPasswordState } = slice.actions;

export const SelectCustomerPassword = (state) => state.customerPassword;

export default slice.reducer;
