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
export const CreateCategory = async (values: any): Promise<ResponseAPI<any>> => {
  try {
    const { data } = await axiosConfig.post(`${mainUrl}`, values);
    return data;
  } catch (error) {
    return {data: [], status: 404};
  }
}
export const UpdateCategory = async (values: any): Promise<ResponseAPI<any>> => {
  try {
    const { data } = await axiosConfig.put(`${mainUrl}`, values);
    return data;
  } catch (error) {
    return {data: [], status: 404};
  }
}
export const DeleteCategories = async (id: number): Promise<ResponseAPI<any>> => {
  try {
    const { data } = await axiosConfig.delete(`${mainUrl}/${id}`);
    return data;
  } catch (error) {
    return {data: [], status: 404};
  }
}