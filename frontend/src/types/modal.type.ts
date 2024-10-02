export type ModalTypeState<T> = {
  expense: boolean;
  deleteExpense: boolean;
  details: T | null;
  globalConfiguration: boolean;
}