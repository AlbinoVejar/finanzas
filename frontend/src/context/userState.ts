import { RecoilState, atom, selector, AtomEffect } from "recoil";
import { UserStateType } from "../types/user.type";
import dayjs from "dayjs";

const localStorageEffect = (key: string): AtomEffect<UserStateType> => ({setSelf, onSet}) => {
  const savedValue: string | null = localStorage.getItem(key);
  if (savedValue !== null) {
    setSelf((prevState: any) => ({
      ...prevState,
      token: savedValue
    }))
  }
  onSet((newValue: UserStateType, _, isReset) => {
    if (isReset) {
      localStorage.removeItem(key)
    } else {
      localStorage.setItem(key, newValue.token);
    }
  });
} 

export const UserState: RecoilState<UserStateType> = atom<UserStateType>({
  key: "UserState",
  default: {
    token: "",
    filters: {
      init_date: dayjs().startOf('month').format('YYYY-MM-DD'),
      end_date: dayjs().endOf('month').format('YYYY-MM-DD')
    }
  },
  effects: [
    localStorageEffect('userToken')
  ]
});

export const UserSelector = selector({
  key: "UserSelect",
  get: ({get}) => {
    return get(UserState);
  }
})