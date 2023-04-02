/* eslint-disable no-undef */
import axios from "axios";
const API_ENDPOINT = process.env.REACT_APP_ALQURAN_API_URL;
const province_list = `${API_ENDPOINT}/imsakiyah/provinsi`;
const city_list = `${API_ENDPOINT}/imsakiyah/kabkota`;
const solat_schedule = `${API_ENDPOINT}/imsakiyah/jadwal`;

const getProvinceList = async () => {
  const result = await axios
    .get(province_list)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      err;
    });
  return result;
};

const getCityList = async (province) => {
  const result = await axios
    .post(city_list, { provinsi: province })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      err;
    });
  return result;
};

const getSholatSchedule = async (province, city) => {
  const result = await axios
    .post(solat_schedule, { provinsi: province, kabKota: city })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      err;
    });
  return result;
};

export { getProvinceList, getCityList, getSholatSchedule };
