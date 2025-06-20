import { Account, TotalWasteAccount } from "./account.type";
import { Category } from "./category.type";

export type UserStateType = {
  token: string;
  filters: {
    init_date: string;
    end_date: string;
    current: string;
    id_account: number;
    id_category: number;
  },
  details: TotalWasteAccount,
  refetches: {
    detailsAccount: any;
  },
  items: {
    accounts: Account[],
    categories: Category[]
  }
}

export type UserDashboard = {
  Id: number;
  Id_account: number;
  Init_date: string;
  End_date: string;
}