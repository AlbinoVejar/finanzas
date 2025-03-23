import axios from "axios";
import { APP_ENV, prodURL, url_localhost } from "../shared/enviroment";
import { setupInterceptorsTo } from "../middlewares/requets";

const axiosConfig = setupInterceptorsTo(axios.create({
  baseURL: APP_ENV === "production" ? prodURL : url_localhost,
  timeout: 10000
}))


export default axiosConfig