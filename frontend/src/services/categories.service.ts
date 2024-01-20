import axios from "axios"
import { url_localhost } from "../shared/enviroment";

const mainUrl: string = "/categories"; 

export const GetCategories = async () => {
  try {
    const { data } = await axios.get(`${url_localhost}${mainUrl}`);
    debugger;
    return data;
  } catch (error) {
    return "error";
  }
}