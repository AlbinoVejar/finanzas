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

export type TotalCategory = {
  Id: number;
  Category: string;
  Description: string;
  Total: number;
  Id_rel_category: number;
}
