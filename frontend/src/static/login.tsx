import {
  Flex,
  Box,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  FormErrorMessage,
  Alert,
  AlertIcon,
} from '@chakra-ui/react'
import {
  Controller,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from 'react-hook-form'
import { renderErrorsText } from '../utils/tools'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import useAuthQuery from '../hooks/useAuth.hook'
import { LoginType } from '../types/auth.type'
import useLocalStorage from '../hooks/useLocalStorage'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const schemaLogin = z.object({
  Email: z.string().email(),
  Password: z.string().min(3),
})

const Login = () => {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [_, setValue] = useLocalStorage({
    keyName: 'userToken',
    defaultValue: '',
  })
  const { LoginMutation } = useAuthQuery()
  const navigate = useNavigate()
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginType>({
    defaultValues: {
      Email: '',
      Password: '',
    },
    resolver: zodResolver(schemaLogin),
  })

  const onSubmit: SubmitHandler<LoginType> = async (data: LoginType) => {
    setSubmitted(false);
    try {
      if (isValid) {
        const { data: response, status } = await LoginMutation.mutateAsync(data)
        if (response && status) {
          setValue(response)
          navigate('/app')
        }
      }
    } catch (error) {
      
    } finally {
      setSubmitted(true);
    }
  }

  const onErrorsSubmit: SubmitErrorHandler<LoginType> = async () => {
    setSubmitted(false);
  }

  return (
    <Flex alignContent="center" width="100%" height="50%" alignItems="center">
      <Box
        borderRadius="lg"
        borderWidth="2px"
        width="100%"
        height="60%"
        alignContent="center"
        px={6}
      >
        <Heading textAlign="center">Iniciar Sesión</Heading>
        <form onSubmit={handleSubmit(onSubmit, onErrorsSubmit)}>
          <VStack gap={4}>
            <FormControl isInvalid={Boolean(errors?.Email)}>
              <FormLabel>Usuario</FormLabel>
              <Controller
                name="Email"
                control={control}
                render={({ field }) => (
                  <Input type="email" width="100%" {...field} />
                )}
              />
              {renderErrorsText(errors?.Email?.message, '')}
            </FormControl>
            <FormControl isInvalid={Boolean(errors?.Password)}>
              <FormLabel>Contraseña</FormLabel>
              <Controller
                name="Password"
                control={control}
                render={({ field }) => (
                  <Input type="password" width="100%" {...field} />
                )}
              />
              {renderErrorsText(errors?.Password?.message, '')}
            </FormControl>
            {(LoginMutation.isError && submitted) ? (
              <Alert status="error">
                <AlertIcon />
                Contraseña y/o Email Incorrectos
              </Alert>
            ) : (
              <></>
            )}
            <Button
              variant="solid"
              colorScheme="blue"
              width="50%"
              type="submit"
            >
              Entrar
            </Button>
          </VStack>
        </form>
      </Box>
    </Flex>
  )
}

export default Login
