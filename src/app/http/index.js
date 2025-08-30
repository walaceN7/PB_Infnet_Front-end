import Axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

export const httpClient = Axios.create({
  baseURL: baseURL,
  withCredentials: false,
});
