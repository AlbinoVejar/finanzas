export type TableType = {
  headers: any[],
  data: any[]
}

export type TableHeaderType = {
  id: string;
  label: string;
  empty: string;
}

export type TableActionType = {
  id: string;
  label: string;
  icon: JSX.Element;
  handler: any;
}