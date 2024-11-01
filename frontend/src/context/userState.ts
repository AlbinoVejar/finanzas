import { RecoilState, atom, selector, AtomEffect } from "recoil";
import { UserStateType } from "../types/user.type";
import dayjs from "dayjs";

const localStorageEffect = (key: string): AtomEffect<UserStateType> => ({ setSelf, onSet }) => {
  const savedValue: string = String(localStorage.getItem(key) ?? '');
  if (savedValue) {
    setSelf((prevState: any) => ({
      ...prevState,
      token: String(savedValue)
    }))
  }
  onSet((newValue: UserStateType, _, isReset) => {
    if (isReset) {
      localStorage.removeItem(key)
    } else {
      if (String(newValue.token) !== '') {
        localStorage.setItem(key, String(newValue.token));
      }
    }
  });
}

export const UserState: RecoilState<UserStateType> = atom<UserStateType>({
  key: "UserState",
  default: {
    token: new String().toString(),
    filters: {
      init_date: dayjs().startOf('month').format('YYYY-MM-DD'),
      end_date: dayjs().endOf('month').format('YYYY-MM-DD')
    },
    details: {
      Id_Account: 0,
      Id_rel_Account: 0,
      Account: 'Example1',
      Credit: false,
      Total: 11111,
      Limit_amount: 99999,
      Created_at: dayjs().format('YYYY-MM-DD')
    },
    refetches: {
      detailsAccount: () => ({})
    },
    items: {
      categories: [],
      accounts: [],
    }
  },
  effects: [
    localStorageEffect('userToken')
  ]
});

export const UserSelector = selector({
  key: "UserSelect",
  get: ({ get }) => {
    return get(UserState);
  }
})