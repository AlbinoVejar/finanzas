import axios from "axios";
import { url_localhost } from "../shared/enviroment";
import { setupInterceptorsTo } from "../middlewares/requets";

const apiURL = import.meta.env.VITE_APP_ENV;
const prodURL = import.meta.env.VITE_APP_APIURL;
console.log("ENV: ", apiURL, prodURL);

const axiosConfig = setupInterceptorsTo(axios.create({
  baseURL: apiURL === "production" ? prodURL : url_localhost,
  timeout: 10000,
  headers: {
    "Content-Type": 'application/json'
  }
}))


export default axiosConfig