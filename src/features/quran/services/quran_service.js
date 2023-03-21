/* eslint-disable no-undef */
import axios from "axios";
const API_ENDPOINT = process.env.REACT_APP_ALQURAN_API_URL;
const quran_list_endpoint = `${API_ENDPOINT}/surat`;
const quran_detail_endpoint = `${API_ENDPOINT}/surat`;

const getSuratList = async () => {
  const result = await axios
    .get(quran_list_endpoint)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      err;
    });
  return result;
};

const getSuratDetail = async (nomor) => {
  const result = await axios
    .get(`${quran_detail_endpoint}/${nomor}`)
    .then((response) => {
      return response;
    })
    .catch((err) => err);
  return result;
};

export { getSuratList, getSuratDetail };
