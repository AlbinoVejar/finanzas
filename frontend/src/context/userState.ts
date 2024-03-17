import { RecoilState, atom, selector } from "recoil";
import { UserStateType } from "../types/user.type";

export const UserState: RecoilState<UserStateType> = atom({
  key: "UserState",
  default: {
    accountSelected: 0,
  }
});

export const UserSelector = selector({
  key: "tableSelect",
  get: ({get}) => {
    return get(UserState);
  }
})