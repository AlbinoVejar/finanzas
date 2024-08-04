import { BrowserRouter } from 'react-router-dom'
import AppRouter from './routes/app'

const App = () => {
  return (
    <>
      <BrowserRouter basename='/' key='root'>
        <AppRouter />
      </BrowserRouter>
    </>
  )
}

export default App
