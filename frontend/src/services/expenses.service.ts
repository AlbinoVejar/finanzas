import axios from "axios"
import { url_localhost } from "../shared/enviroment";

const mainUrl: string = "/expenses"; 

export const CreateExpense = async (): Promise<any> => {
  try {
    const { data } = await axios.post(`${url_localhost}${mainUrl}`);
    return data;
  } catch (error) {
    return false;
  }
}