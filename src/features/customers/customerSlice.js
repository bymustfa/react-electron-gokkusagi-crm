import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "customers",
  initialState: {
    Unvan: "",
    Vkn: "",
    SatisTemsilcisiId: "",
    MusteriGrubu: "",
    MusteriTipi: "",
    MusteriNo: "",
    ZiyaretSikligi: "",
    VergiDaire: "",
    Mail: "",
    Telefon: "",
    Faks: "",
    Adres: "",
    Aciklama: "",
    Adresler: [],
    Kisiler: [],
  },
  reducers: {
    setState: (state, action) => {
      state[action.payload.key] = action.payload.value;
    },
  },
});

export const { setState } = slice.actions;

export const SelectCustomers = (state) => state.customers;

export default slice.reducer;
