import { ResponseAPI } from "../types/response.type";
import { Category } from "../types/category.type";
import axiosConfig from "../utils/axiosConfig";

const mainUrl: string = "/categories"; 

export const GetCategories = async (): Promise<ResponseAPI<Category[]>> => {
  try {
    const { data } = await axiosConfig.get(`${mainUrl}`);
    return data;
  } catch (error) {
    return {data: [], status: 404};
  }
}