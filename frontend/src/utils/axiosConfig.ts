import axios from "axios";
import { url_localhost } from "../shared/enviroment";
import { setupInterceptorsTo } from "../middlewares/requets";

const axiosConfig = setupInterceptorsTo(axios.create({
  baseURL: url_localhost,
  timeout: 10000,
  headers: {
    "Content-Type": 'application/json'
  }
}))


export default axiosConfig