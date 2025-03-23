import { RecoilState, atom, selector } from "recoil";
import { TableType } from "../types/table.type";

export const TableState: RecoilState<TableType> = atom({
  key: "tableState",
  default: {
    headers: [],
    data: []
  } as TableType
});

export const TableSelector = selector({
  key: "tableSelect",
  get: ({get}) => {
    return get(TableState);
  }
})