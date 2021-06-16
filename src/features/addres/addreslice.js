import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "addres",
  initialState: {
    countries: [],
    provinces: [],
    districts: [],
    neighborhoods: [],
    countryId: 40,
    provinceId: 1,
    districtId: 1,
    neighborhoodId: 1,
  },
  reducers: {
    setCountries: (state, action) => {
      state.countries = action.payload;
    },
    setProvinces: (state, action) => {
      state.provinces = action.payload;
    },
    setDistricts: (state, action) => {
      state.districts = action.payload;
    },
    setNeighborhoods: (state, action) => {
      state.neighborhoods = action.payload;
    },

    setCountryId: (state, action) => {
      state.countryId = action.payload;
    },
    setProvinceId: (state, action) => {
      state.provinceId = action.payload;
    },
    setDistrictId: (state, action) => {
      state.districtId = action.payload;
    },
    setNeighborhoodId: (state, action) => {
      state.neighborhoodId = action.payload;
    },
  },
});

export const {
  setCountries,
  setProvinces,
  setDistricts,
  setNeighborhoods,
  setCountryId,
  setProvinceId,
  setDistrictId,
  setNeighborhoodId,
} = slice.actions;

export const SelectAddres = (state) => state.addres;

export default slice.reducer;
