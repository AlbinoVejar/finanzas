export type Account = {
  Id?: number;
  Name: string;
  Credit: boolean;
  Total?: number;
  Limit_amount: number;
  
}

export type AccountStateType = {
  id: number;
  filters: {
    init_date: string;
    end_date: string;
  }
}

export type TotalWasteAccount = {
  Id_Account: number;
  Id_rel_Account: number;
  Account: string;
  Credit: boolean;
  Total: number;
  Limit_amount: number;
  Created_at: string;
}
