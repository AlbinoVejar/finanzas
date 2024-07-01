export type Account = {
  Id?: number;
  Name: string;
  Credit: boolean;
  Total: number;
  Limit_Credit: number;
  
}

export type AccountStateType = {
  id: number;
  filters: {
    init_date: string;
    end_date: string;
  }
}
