import { ResponseAPI } from "../types/response.type";
import { Expense, NewExpense } from "../types/expense.type";
import axiosConfig from "../utils/axiosConfig";

const mainUrl: string = "/expenses";

export const CreateExpense = async (expense: NewExpense): Promise<ResponseAPI<any>> => {
  try {
    const { data } = await axiosConfig.post(`${mainUrl}`, expense);
    return data;
  } catch (error: any) {
    throw error.response;
  }
}

export const GetExpenseByAccount = async (filter: any): Promise<ResponseAPI<any>> => {
  try {
    const { data } = await axiosConfig.get(`${mainUrl}/totals?init=${filter.init_date}&end=${filter.end_date}${filter.id ? '&id_account='+filter.id : ''}`);
    return data;
  } catch (error) {
    throw { data: null, status: 404 }
  }
}

export const GetDashboardExpenses = async (filter: any): Promise<ResponseAPI<any>> => {
  try {
    const { data } = await axiosConfig.get(`${mainUrl}/dashboard?init=${filter.init_date}&end=${filter.end_date}&current=${filter.current}`);
    return data;
  } catch (error) {
    throw { data: null, status: 404 }
  }
}

export const UpdateExpense = async (expense: Expense): Promise<ResponseAPI<Expense>> => {
  try {
    const { data } = await axiosConfig.put(`${mainUrl}/${expense.Id}`, expense);
    return data;
  } catch (error) {
    throw { data: null, status: 404 }
  }
}

export const DeleteExpense = async (expense: Expense): Promise<ResponseAPI<Expense>> => {
  try {
    const { data } = await axiosConfig.delete(`${mainUrl}/${expense.Id}`);
    return data;
  } catch (error) {
    throw { data: null, status: 404 }
  }
}