import { CreateCategory, DeleteCategories, GetCategories, UpdateCategory } from '../services/categories.service';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ResponseAPI } from '../types/response.type';
import { Category } from '../types/category.type';

const useCategories = () => {
  const GetItemsCategories = () => useQuery({
    queryKey:["get_categories"],
    queryFn: async () => await GetCategories(),
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    select(data: ResponseAPI<Category[]>) {
      const {data: values, status} = data;
      if(status !== 200){
        return [];
      }else{
        return values;
      }
    },
  });
  const createCategory = useMutation({
    mutationKey: ["create_category"],
    mutationFn: async(values: any) => await CreateCategory(values),
      onError(error) {
        throw error
      },
  })
  const updateCategory = useMutation({
    mutationKey: ["update_category"],
    mutationFn: async(values: any) => await UpdateCategory(values),
      onError(error) {
        throw error
      },
  })
  const DeleteCategory = 
    useMutation({
      mutationKey: ["delete_category"],
      mutationFn: async(Id: number) => await DeleteCategories(Id),
      onError(error) {
        throw error
      },
    })

  return {GetItemsCategories, createCategory, updateCategory, DeleteCategory}
}

export default useCategories