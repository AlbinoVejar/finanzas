import { RecoilState, atom, selector } from "recoil";
import { AccountStateType } from "../types/account.type";
import dayjs from "dayjs";
import { FormatDate } from "../utils";

export const AccountState: RecoilState<AccountStateType> = atom<AccountStateType>({
  key: 'accountState',
  default: {
    id: 1,
    filters: {
      init_date: dayjs().startOf('month').format(FormatDate),
      end_date: dayjs().endOf('month').format(FormatDate),
      current: dayjs().format(FormatDate)
    }
  }
});

export const AccountSelector = selector({
  key: "accountsSelect",
  get: ({get}) => {
    return get(AccountState);
  }
})