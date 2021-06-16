import axios from "axios";

export const getCountries = async () => {
  const countries = await axios.get(
    process.env.REACT_APP_API_URL + "Parametre/UlkeList"
  );
  return countries.status === 200 && countries.data.SonucTipi === 1
    ? countries.data.Veri
    : [];
};

export const getProvinces = async (countryId) => {
  const provinces = await axios.get(
    process.env.REACT_APP_API_URL + "Parametre/IlList?ulkeId=" + countryId
  );
  return provinces.status === 200 && provinces.data.SonucTipi === 1
    ? provinces.data.Veri
    : [];
};
export const getDistricts = async (provinceId) => {
  const districts = await axios.get(
    process.env.REACT_APP_API_URL + "Parametre/IlceList?ilId=" + provinceId
  );
  return districts.status === 200 && districts.data.SonucTipi === 1
    ? districts.data.Veri
    : [];
};
export const getNeighborhoods = async (districtId) => {
  const neighborhood = await axios.get(
    process.env.REACT_APP_API_URL + "Parametre/SemtList?IlceId=" + districtId
  );
  return neighborhood.status === 200 && neighborhood.data.SonucTipi === 1
    ? neighborhood.data.Veri
    : [];
};
