import axios from "axios"
import { url_localhost } from "../shared/enviroment";
import { ResponseAPI } from "../types/response.type";
import { NewExpense, Resume } from "../types/expense.type";
import { useQuery } from "@tanstack/react-query";
import axiosConfig from "../utils/axiosConfig";

const mainUrl: string = "/expenses"; 

export const CreateExpense = async (expense: NewExpense): Promise<ResponseAPI<any>> => {
  try {
    const { data } = await axiosConfig.post(`${mainUrl}`, expense);
    return data;
  } catch (error) {
    return {data: null, status: 404}
  }
}

export const GetExpenseByAccount = async (filter: any): Promise<ResponseAPI<any>> => {
  try {
    const { data } = await axiosConfig.get(`${mainUrl}/totals?init=${filter.init_date}&end=${filter.end_date}&id_account=${filter.id}`);
    return data;
  } catch (error) {
    return {data: null, status: 404}
  }
}