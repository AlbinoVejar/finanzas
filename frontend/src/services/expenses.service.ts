import axios from "axios"
import { url_localhost } from "../shared/enviroment";
import { ResponseAPI } from "../types/response.type";
import { Expense } from "../types/expense.type";

const mainUrl: string = "/expenses"; 

export const CreateExpense = async (expense: Expense): Promise<ResponseAPI<any>> => {
  try {
    const { data } = await axios.post(`${url_localhost}${mainUrl}`, expense);
    return data;
  } catch (error) {
    return {data: null, status: 404}
  }
}