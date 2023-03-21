/* eslint-disable no-undef */
import axios from "axios";
// const API_ENDPOINT = process.env.REACT_APP_DOA_API_URL;
const doa_list_endpoint = `https://api.hadith.gading.dev/books`;

const getDoaList = async () => {
  const result = await axios
    .get(doa_list_endpoint)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      err;
    });
  return result;
};

export { getDoaList };
