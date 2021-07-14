import axios from "axios";

export const getUsers = async (type = null) => {
  const url = type
    ? process.env.REACT_APP_API_URL +
      "Kullanici/GetKullaniciTipIdByList?tipId=" +
      type
    : process.env.REACT_APP_API_URL + "Kullanici/GetList";

  const users = await axios.get(url);
  return users.status === 200 && users.data.SonucTipi === 1
    ? users.data.Veri
    : [];
};

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

export const getCustomers = async () => {
  const customers = await axios.get(
    process.env.REACT_APP_API_URL + "Musteri/MusterilerFilter"
  );
  return customers.status === 200 && customers.data.SonucTipi === 1
    ? customers.data.Veri
    : [];
};

export const getCustomerUsers = async (customerId) => {
  const users = await axios.get(
    process.env.REACT_APP_API_URL + "Musteri/GetMusteriKisiler?Id=" + customerId
  );
  return users.status === 200 && users.data.SonucTipi === 1
    ? users.data.Veri
    : [];
};

export const getCustomerAddress = async (customerId) => {
  const address = await axios.get(
    process.env.REACT_APP_API_URL +
      "Musteri/GetMusteriAdresler?Id=" +
      customerId
  );
  return address.status === 200 && address.data.SonucTipi === 1
    ? address.data.Veri
    : [];
};

export const getStocksFilter = async (word) => {
  const stocks = await axios.get(
    process.env.REACT_APP_API_URL + "Stok/StokAra?kelime=" + word
  );

  return stocks.status === 200 && stocks.data.SonucTipi === 1
    ? stocks.data.Veri
    : [];
};
