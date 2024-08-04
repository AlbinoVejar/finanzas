import axios from "axios"
import { url_localhost } from "../shared/enviroment"
import { ResponseAPI } from "../types/response.type"
import { LoginType } from "../types/auth.type"

const mainUrl: string = '/users'

export const Login = async (form: LoginType): Promise<ResponseAPI<string>> => {
  try {
    const { data } = await axios.post<ResponseAPI<string>>(`${url_localhost}${mainUrl}/login`, form)
    return data
  } catch (error) {
    return { data: "", status: 404 }
  }
}