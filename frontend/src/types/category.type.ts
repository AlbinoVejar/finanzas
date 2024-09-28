import { ResumeExpense } from "./expense.type";

export type Category = {
  Id: number;
  Name: string;
}

export type ResumeCategory = {
  data: Category[];
  resume: ResumeExpense[];
}

export type TotalCategory = {
  Id_account: number;
  Account_Name: string;
  Id_category: number;
  Category: string;
  Total: number;
  Id_rel_category: number;
  Id_rel_account: number;
  Created_at: string;
}

export type CategoryStateType = {
  items: Category[];
}