import { ResponseAPI } from "../types/response.type"
import { LoginType } from "../types/auth.type"
import axiosConfig from "../utils/axiosConfig";

const mainUrl: string = '/users'

export const Login = async (form: LoginType): Promise<ResponseAPI<string>> => {
  try {
    const { data } = await axiosConfig.post<ResponseAPI<string>>(`${mainUrl}/login`, form)
    return data
  } catch (error: any) {
    throw error;
  }
}