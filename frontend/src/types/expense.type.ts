import { Account } from "./account.type"
import { Category } from "./category.type"

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
  Id_Category: number
  Id_Rel_Account: number
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
}

export type ResumeData = {
  accounts: Account[];
  categories: Category[];
  data: Resume[];
}