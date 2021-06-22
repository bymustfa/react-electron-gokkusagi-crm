import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "user",
  initialState: {
    Ad: "",
    Soyad: "",
    Mail: "",
    Telefon: "",
    Durum: true,
  },
  reducers: {
    setUsersState: (state, action) => {
      state[action.payload.key] = action.payload.value;
    },
  },
});

export const { setUsersState } = slice.actions;

export const SelectUser = (state) => state.user;

export default slice.reducer;
