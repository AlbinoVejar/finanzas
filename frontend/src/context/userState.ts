import { RecoilState, atom, selector } from "recoil";
import { UserStateType } from "../types/user.type";
import dayjs from "dayjs";

export const UserState: RecoilState<UserStateType> = atom<UserStateType>({
  key: "UserState",
  default: {
    idUser: 1,
    filters: {
      init_date: dayjs().startOf('month').format('YYYY-MM-DD'),
      end_date: dayjs().endOf('month').format('YYYY-MM-DD')
    }
  },
});

export const UserSelector = selector({
  key: "UserSelect",
  get: ({get}) => {
    return get(UserState);
  }
})