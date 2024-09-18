import { useToast } from '@chakra-ui/react'
import {
  RiCheckboxBlankCircleFill,
  RiCloseCircleFill,
  RiErrorWarningFill,
  RiInformationFill,
} from '@remixicon/react'
import { useEffect, useState } from 'react'
type toastType = {
  status: 'success' | 'warning' | 'info' | 'error'
  title: string
  description?: string
}
const useToastComponent = () => {
  const [state, setState] = useState<toastType>({
    title: '',
    description: '',
    status: 'info',
  })
  const toast = useToast()
  const getIcon = {
    success: <RiCheckboxBlankCircleFill />,
    error: <RiCloseCircleFill />,
    warning: <RiErrorWarningFill />,
    info: <RiInformationFill />,
  }
  useEffect(() => {
    if (state.title) {
      const {title, description, status} = state;
      toast({
        title,
        description,
        status,
        icon: getIcon[status],
      });
    }
  }, [state, toast])

  return setState;
}

export default useToastComponent
