import { RecoilState, atom, selector } from "recoil";
import { Category } from "../types/category.type";

export const CategoryState: RecoilState<Category[]> = atom<Category[]>({
  key: 'categoryState',
  default: []
});

export const CategorySelector = selector({
  key: "categoriesSelect",
  get: ({get}) => {
    return get(CategoryState);
  }
})