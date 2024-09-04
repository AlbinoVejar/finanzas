import { TotalWasteAccount } from "./account.type";

export type UserStateType = {
  token: string;
  filters: {
    init_date: string;
    end_date: string;
  },
  details: TotalWasteAccount
}

export type UserDashboard = {
  Id: number;
  Id_account: number;
  Init_date: string;
  End_date: string;
}