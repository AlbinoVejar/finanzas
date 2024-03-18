import { ResumeExpense } from "./expense.type";

export type Category = {
  Id: number;
  Name: string;
  Created_at: string;
}

export type ResumeCategory = {
  data: Category[];
  resume: ResumeExpense[];
}