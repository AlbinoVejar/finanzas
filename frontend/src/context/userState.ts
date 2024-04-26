import { RecoilState, atom, selector } from "recoil";
import { UserStateType } from "../types/user.type";

export const UserState: RecoilState<UserStateType> = atom<UserStateType>({
  key: "UserState",
  default: {
    accountSelected: 0,
    categorySelected: 0,
    idUser: 0,
    Init_date: '',
    End_date: '',
    dateMode: false
  },
});

export const UserSelector = selector({
  key: "UserSelect",
  get: ({get}) => {
    return get(UserState);
  }
})