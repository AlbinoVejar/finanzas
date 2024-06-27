import axios from "axios"
import { url_localhost } from "../shared/enviroment";
import { ResponseAPI } from "../types/response.type";
import { NewExpense, Resume } from "../types/expense.type";
import { useQuery } from "@tanstack/react-query";

const mainUrl: string = "/expenses"; 

export const CreateExpense = async (expense: NewExpense): Promise<ResponseAPI<any>> => {
  try {
    const { data } = await axios.post(`${url_localhost}${mainUrl}`, expense);
    return data;
  } catch (error) {
    return {data: null, status: 404}
  }
}
export const GetResume = async (expense: Resume): Promise<ResponseAPI<any>> => {
  try {
    const { data } = await axios.post(`${url_localhost}${mainUrl}/resume`, expense);
    return data;
  } catch (error) {
    return {data: null, status: 404}
  }
}

const GetAllExpenseByAccount = async (id: Number): Promise<ResponseAPI<any>> => {
  try {
    const { data } = await axios.get(`${url_localhost}${mainUrl}/${id}`);
    return data;
  } catch (error) {
    return {data: null, status: 404}
  }
}

export const useGetAllExpensesAccountQuery = (id: number) => {
  return useQuery({
    queryKey: ['get_all_expenses_account', id],
    queryFn: () => GetAllExpenseByAccount(id),
    enabled: id > 0,
  })
}