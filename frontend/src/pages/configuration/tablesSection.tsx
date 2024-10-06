import React from 'react'
import Quicktable from '../../components/quicktable'
import { TableHeadersAccounts, TableHeadersCategories } from './headers'
import useAccounts from '../../hooks/useAccounts.hook'
import useCategories from '../../hooks/useCategories.hook'
import { Card, CardBody, CardHeader, Heading } from '@chakra-ui/react'

const TablesSection = () => {
  const { data: itemsAccounts } = useAccounts().getAllItemsAccounts()
  const { data: itemsCategories } = useCategories().GetItemsCategories()
  return (
    <>
      <Card>
        <CardHeader>
          <Heading size="md">Categorias</Heading>
        </CardHeader>
        <CardBody>
          {itemsCategories && (
            <Quicktable
              data={itemsCategories}
              headers={TableHeadersCategories}
              keyTable="categories"
            />
          )}
        </CardBody>
      </Card>
      <Card>
        <CardHeader>
          <Heading size="md">Cuentas</Heading>
        </CardHeader>
        <CardBody>
          {itemsAccounts && (
            <Quicktable
              data={itemsAccounts}
              headers={TableHeadersAccounts}
              keyTable="accounts"
            />
          )}
        </CardBody>
      </Card>
    </>
  )
}

export default TablesSection
