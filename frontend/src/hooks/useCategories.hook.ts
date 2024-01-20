import React, { useEffect } from 'react'
import { GetCategories } from '../services/categories.service';

const useCategories = () => {
  useEffect(() => {
    GetCategories().then((data) => {
      console.log('data', data);
    })
  }, []);
}

export default useCategories