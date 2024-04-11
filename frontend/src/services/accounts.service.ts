import axios from "axios"
import { url_localhost } from "../shared/enviroment";
import { ResponseAPI } from "../types/response.type";
import { Account } from "../types/account.type";
import { TotalCategory } from "../types/category.type";
import { UserDashboard } from "../types/user.type";

const mainUrl: string = "/accounts"; 

export const GetAccounts = async (): Promise<ResponseAPI<Account[]>> => {
  try {
    const { data } = await axios.get(`${url_localhost}${mainUrl}`);
    return data;
  } catch (error) {
    return {data: [], status: 404};
  }
}

export const CreateAccount = async (account: Account): Promise<ResponseAPI<any>> => {
  try {
    const { data } = await axios.post(`${url_localhost}${mainUrl}`, account);
    return data;
  } catch (error) {
    return {data: null, status: 404};
  }
}

export const GetTotalsByAccount = async (user: UserDashboard): Promise<ResponseAPI<TotalCategory[]>> => {
  try {
    const { data } = await axios.post(`${url_localhost}${mainUrl}/totals`, user);
    return data;
  } catch (error) {
    return {data: [], status: 404};
  }
}
