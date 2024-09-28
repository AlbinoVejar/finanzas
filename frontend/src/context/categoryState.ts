import { RecoilState, atom, selector } from "recoil";
import { CategoryStateType } from "../types/category.type";

export const CategoryState: RecoilState<CategoryStateType> = atom<CategoryStateType>({
  key: 'categoryState',
  default: {
    items: [],
  }
});

export const CategorySelector = selector({
  key: "categoriesSelect",
  get: ({get}) => {
    return get(CategoryState);
  }
})