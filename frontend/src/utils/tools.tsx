import { FormErrorMessage, FormHelperText } from '@chakra-ui/react'

export const renderErrorsText = (
  errorMessage: string | undefined,
  helpText: string
) => {
  if (Boolean(errorMessage)) {
    return <FormErrorMessage>{errorMessage}</FormErrorMessage>
  } else {
    return helpText !== '' ? <FormHelperText>{helpText}</FormHelperText> : <></>
  }
}