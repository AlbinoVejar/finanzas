import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { RecoilRoot } from 'recoil'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RecoilRoot>
      <ChakraProvider toastOptions={{defaultOptions: { position: 'bottom', isClosable: true }}}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </ChakraProvider>
    </RecoilRoot>
  </React.StrictMode>
)
