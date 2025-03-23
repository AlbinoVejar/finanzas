import { RecoilState, atom, selector } from "recoil";
import { AccountStateType } from "../types/account.type";
import dayjs from "dayjs";

export const AccountState: RecoilState<AccountStateType> = atom<AccountStateType>({
  key: 'accountState',
  default: {
    id: 1,
    filters: {
      init_date: dayjs().startOf('month').format('YYYY-MM-DD'),
      end_date: dayjs().endOf('month').format('YYYY-MM-DD')
    }
  }
});

export const AccountSelector = selector({
  key: "accountsSelect",
  get: ({get}) => {
    return get(AccountState);
  }
})