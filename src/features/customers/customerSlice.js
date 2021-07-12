import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "customers",
  initialState: {
    Unvan: "",
    Vkn: "",
    SatisTemsilcisiId: "",
    MusteriGrubu: "",
    MusteriTipi: "",
    MusteriKod: "",
    ZiyaretSikligi: "",
    VergiDaire: "",
    Mail: "",
    Telefon: "",
    Faks: "",

    Aciklama: "",
    Adresler: [],
    Kisiler: [],

    SrvSifre: "",
    EMikroKullanici: "",
    EMikroSifre: "",
    AkisPin: "",
    SunucuGiris: "",
    SunucuSifre: "",

    BakimAnlasmalari: [],
  },
  reducers: {
    setState: (state, action) => {
      state[action.payload.key] = action.payload.value;
    },

    setAddressAdd: (state, action) => {
      state.Adresler.push(action.payload);
    },

    setUsersAdd: (state, action) => {
      state.Kisiler.push(action.payload);
    },

    setContractAdd: (state, action) => {
      state.BakimAnlasmalari = [action.payload, ...state.BakimAnlasmalari];
    },
  },
});

export const {
  setState,
  setAddressAdd,
  setUsersAdd,
  setContractAdd,
} = slice.actions;

export const SelectCustomers = (state) => state.customers;

export default slice.reducer;
