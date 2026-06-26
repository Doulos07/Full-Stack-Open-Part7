import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/name";

const getCountry = (name) => {
  const response = axios.get(`${baseUrl}/${name}`);
  return response.then((res) => res.data);
};

export default { getCountry };
