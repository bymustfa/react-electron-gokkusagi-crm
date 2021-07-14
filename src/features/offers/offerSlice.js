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

    setLinesDelete: (state, action) => {
      state.Satirlar = [...state.Satirlar].filter(
        (x) => x.Sira !== action.payload
      );
    },

    setDescriptionAdd: (state, action) => {
      state.Aciklamalar = [action.payload, ...state.Aciklamalar];
    },

    setDescriptionDelete: (state, action) => {
      state.Aciklamalar = [...state.Aciklamalar].filter(
        (x) => x.Sira !== action.payload
      );
    },
  },
});

export const {
  setOfferState,
  setLinesAdd,
  setLinesDelete,
  setDescriptionAdd,
  setDescriptionDelete,
} = slice.actions;

export const SelectOffers = (state) => state.offers;

export default slice.reducer;
