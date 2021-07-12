import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "offers",
  initialState: {
    Id: 0,
    SiparisNo: "",
    SeriNo: "",
    SiparisDurumId: "",
    MusteriId: "",
    MusteriAdresId: "",
    ParaBirimiId: "",
    SorumlulukMerkeziId: "",
    ProjeId: "",
    DepoId: "",
    SaticiId: "",
    Tarih: "",
    Kur: "",
    TeslimTarihi: "",
    TeslimTipiId: "",
    Aciklamalar: [],
    Satirlar: [],
    SatirAdet: 0,
  },
  reducers: {
    setOfferState: (state, action) => {
      state[action.payload.key] = action.payload.value;
    },

    setLinesAdd: (state, action) => {
      state.Satirlar = [action.payload, ...state.Satirlar];
    },

    setDescriptionAdd: (state, action) => {
      state.Aciklamalar = [action.payload, ...state.Aciklamalar];
    },
  },
});

export const { setOfferState, setLinesAdd, setDescriptionAdd } = slice.actions;

export const SelectOffers = (state) => state.offers;

export default slice.reducer;
