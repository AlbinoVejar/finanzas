import { RecoilState, atom, selector } from "recoil";
import { Account } from "../types/account.type";

export const AccountState: RecoilState<Account[]> = atom<Account[]>({
  key: 'accountState',
  default: []
});

export const AccountSelector = selector({
  key: "accountsSelect",
  get: ({get}) => {
    return get(AccountState);
  }
})