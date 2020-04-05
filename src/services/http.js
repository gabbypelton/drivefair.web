import Axios from "axios";

export const setBaseURL = url => {
  Axios.defaults.baseURL = url;
}

export const setBearerToken = (token) => {
  Axios.defaults.headers = { Authorization: `Bearer ${token}` };
};
