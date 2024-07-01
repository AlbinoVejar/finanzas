import { Account } from "./account.type"
import { Category } from "./category.type"
import { TableActionType } from "./table.type"

export type Expense = {
  Id?: number
  Description: string
  Amount: number
  Id_Category: number
}

export type Resume = {
  Id: number
}

export type NewExpense = {
  Description: string
  Amount: number
  Id_rel_Category: number
  Id_rel_Account: number
}

export type ResumeExpense = {
  Id: number
  Id_expense: number
  Amount: number
  Description: string
  Id_account: number
  Account: string
  Credit: boolean
  Id_category: number
  Category: string
  Created_at: string
}

export type ResumeData = {
  accounts: Account[];
  categories: Category[];
  expenses: ResumeExpense[];
}

export type TotalUser = {
  Id_User: number;
  Id_Account: number;
  Init_Date: string;
  End_Date: string;
}

export type ExpenseTable = {
  Id: number;
  Id_expense: number;
  Amount: number;
  Description: string;
  Id_account: number;
  Account: string;
  Credit: boolean;
  Id_category: number;
  Category: string;
  Created_at: string;
  Actions?: TableActionType[];
}

export type ExpenseByAccount = {
  Id: number;
  Id_rel_Expense: number;
  Category: string;
  Amount: number;
  Description: string;
  Id_rel_Category: number;
}