import { RecoilState, atom, selector } from "recoil";
import { UserStateType } from "../types/user.type";

export const UserState: RecoilState<UserStateType> = atom({
  key: "UserState",
  default: {
    accountSelected: 0,
    idUser: 0,
    Init_date: '',
    End_date: ''
  },
});

export const UserSelector = selector({
  key: "UserSelect",
  get: ({get}) => {
    return get(UserState);
  }
})