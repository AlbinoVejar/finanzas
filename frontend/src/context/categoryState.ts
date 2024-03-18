import { RecoilState, atom, selector } from "recoil";
import { ResumeCategory } from "../types/category.type";

export const CategoryState: RecoilState<ResumeCategory> = atom<ResumeCategory>({
  key: 'categoryState',
  default: {
    data: [],
    resume: []
  }
});

export const CategorySelector = selector({
  key: "categoriesSelect",
  get: ({get}) => {
    return get(CategoryState);
  }
})