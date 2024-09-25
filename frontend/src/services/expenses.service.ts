import { ResponseAPI } from "../types/response.type";
import { NewExpense } from "../types/expense.type";
import axiosConfig from "../utils/axiosConfig";

const mainUrl: string = "/expenses";

export const CreateExpense = async (expense: NewExpense): Promise<ResponseAPI<any>> => {
  try {
    const { data } = await axiosConfig.post(`${mainUrl}`, expense);
    return data;
  } catch (error: any) {
    console.log("ERRRRRRROOOOORR")
    throw error.response;
  }
}

export const GetExpenseByAccount = async (filter: any): Promise<ResponseAPI<any>> => {
  try {
    const { data } = await axiosConfig.get(`${mainUrl}/totals?init=${filter.init_date}&end=${filter.end_date}&id_account=${filter.id}`);
    return data;
  } catch (error) {
    throw { data: null, status: 404 }
  }
}