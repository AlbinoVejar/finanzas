import { RecoilState, atom } from "recoil";

export const ModalState: RecoilState<boolean> = atom<boolean>({
  key: 'modalState',
  default: false
});

// export const ModalSelector = () => selector({
//   key: 'modalSelector',

// })