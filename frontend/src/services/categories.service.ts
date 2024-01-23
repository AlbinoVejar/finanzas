import axios from "axios"
import { url_localhost } from "../shared/enviroment";
import { ResponseAPI } from "../types/response.type";
import { Category } from "../types/category.type";

const mainUrl: string = "/categories"; 

export const GetCategories = async (): Promise<ResponseAPI<Category[]>> => {
  try {
    const { data } = await axios.get(`${url_localhost}${mainUrl}`);
    return data;
  } catch (error) {
    return {data: [], status: 404};
  }
}