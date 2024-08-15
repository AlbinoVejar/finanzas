import React, { useState } from 'react'

type UseLocalStorageReturnType = [string, (newValue: string) => void];

type Props = {
  keyName: string;
  defaultValue: string;
}

const useLocalStorage = ({keyName, defaultValue}: Props): UseLocalStorageReturnType => {
  const [storedValue, setStoredValue] = useState<string>(() => {
    try {
      const value = window.localStorage.getItem(keyName);
      if (!value) {
        window.localStorage.setItem(keyName, JSON.stringify(defaultValue))
        return value
      }
      return JSON.parse(value)

    } catch (error) {
      return defaultValue
    }
  })
  const setValue = (newValue: string) => {
    try {
      window.localStorage.setItem(keyName, newValue)
    } catch (error) {
      setStoredValue(newValue)
    }
  }
  return [storedValue, setValue]
}

export default useLocalStorage