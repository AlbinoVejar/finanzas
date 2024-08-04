import { Flex, Box, VStack, FormControl, FormLabel, Input, Button, Heading, FormErrorMessage } from '@chakra-ui/react'
import React from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import accounts from '../pages/accounts'
import { Account } from '../types/account.type'
import { renderErrorsText } from '../utils/tools'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import useAuthQuery from '../hooks/useAuth.hook'
import { LoginType } from '../types/auth.type'

const schemaLogin = z.object({
  Email: z.string().email(),
  Password: z.string().min(3)
}).strict()

const Login = () => {
  const { LoginMutation } = useAuthQuery()
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginType>({
    defaultValues: {
      Email: '',
      Password: ''
    },
    resolver: zodResolver(schemaLogin),
  })

  const onSubmit: SubmitHandler<LoginType> = async (
    data: LoginType
  ) => {
    console.log('isValid', isValid, errors, data)
    if (isValid) {
      const { data: response, status } = await LoginMutation.mutateAsync(data);
      if (status === 404) {
        console.warn('erroooor')
      }
      console.log('response', response)
    }
  }

  return (
    <Flex alignContent="center" width="100%" height="50%" alignItems="center">
      <Box borderRadius="lg" borderWidth="2px" width="100%" height="60%" alignContent="center" px={6}>
        <Heading textAlign='center'>Iniciar Sesión</Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack gap={4}>
            <FormControl isInvalid={Boolean(errors?.Email)}>
              <FormLabel>Usuario</FormLabel>
              <Controller
                name="Email"
                control={control}
                render={({ field }) => (
                  <Input type='email' width="100%"
                    {...field} />
                )}
              />
              {renderErrorsText(
                errors?.Email?.message,
                ''
              )}
            </FormControl>
            <FormControl isInvalid={Boolean(errors?.Password)}>
              <FormLabel>Contraseña</FormLabel>
              <Controller
                name="Password"
                control={control}
                render={({ field }) => (
                  <Input type='password' width="100%"
                    {...field} />
                )}
              />
              {renderErrorsText(
                errors?.Password?.message,
                ''
              )}
            </FormControl>
            {LoginMutation.isError ? <FormErrorMessage>Contraseña y/o Email Incorrectos</FormErrorMessage> : <></>}
            <Button variant="solid" colorScheme="blue" width='50%' type='submit'>
              Entrar
            </Button>
          </VStack>
        </form>
      </Box>
    </Flex>
  )
}

export default Login