import { Card, CardHeader, Heading } from '@chakra-ui/react'
import { Account } from '../../types/account.type'
import { useNavigate } from 'react-router-dom'

type propsTypes = {
  account: Account
}

const Accounts = () => {
  const navigate = useNavigate();

  return (
    <>
    <Card>
      <CardHeader>
        <Heading></Heading>
      </CardHeader>
    </Card>
    </>
  )
}

export default Accounts
