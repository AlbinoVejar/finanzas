import { GetCategories } from '../services/categories.service';
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
  const mutation = useMutation({
    mutationKey: ["create_category"]
  })

  return {GetItemsCategories, mutation}
}

export default useCategories