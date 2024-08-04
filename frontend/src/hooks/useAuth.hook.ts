import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { Login } from '../services/auth.service'
import { LoginType } from '../types/auth.type'

const useAuthQuery = () => {
  const LoginMutation = useMutation({
    mutationKey: ['loginQuery'],
    mutationFn: async (formData: LoginType) => await Login(formData),
    onError(error) {
      console.log('gollaa')
      return error;
    },
  })
  return {LoginMutation}
}

export default useAuthQuery
