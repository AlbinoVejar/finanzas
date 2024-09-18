import { RecoilState, atom } from 'recoil'
import { ModalTypeState } from '../types/modal.type'

export const ModalState: RecoilState<ModalTypeState> = atom<ModalTypeState>({
  key: 'modalState',
  default: { expense: false },
})
