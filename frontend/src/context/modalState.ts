import { RecoilState, atom } from 'recoil'
import { ModalTypeState } from '../types/modal.type'

export const ModalState: RecoilState<ModalTypeState<any>> = atom<ModalTypeState<any>>({
  key: 'modalState',
  default: { expense: false, deleteExpense: false, details: null, globalConfiguration: false },
})
