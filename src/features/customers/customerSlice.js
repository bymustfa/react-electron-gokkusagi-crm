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

    AnlasmaAdi: "",
    AnlasmaBitis: "",
    SrvSifre: "",
    EMikroKullanici: "",
    EMikroSifre: "",
    AkisPin: "",
    SunucuGiris: "",
    SunucuSifre: "",
  },
  reducers: {
    setState: (state, action) => {
      state[action.payload.key] = action.payload.value;
    },

    setAddressAdd: (state, action) => {
      return {
        ...state,
        Adresler: [action.payload, ...state.Adresler],
      };
    },

    setUsersAdd: (state, action) => {
      return {
        ...state,
        Kisiler: [action.payload, ...state.Kisiler],
      };
    },
  },
});

export const { setState, setAddressAdd, setUsersAdd } = slice.actions;

export const SelectCustomers = (state) => state.customers;

export default slice.reducer;
