import React from 'react'
import Quicktable from '../../components/quicktable'
import { TableHeadersAccounts, TableHeadersCategories } from './headers'
import useAccounts from '../../hooks/useAccounts.hook'
import useCategories from '../../hooks/useCategories.hook'
import { Card, CardBody, CardHeader, Heading, SimpleGrid } from '@chakra-ui/react'
import { RiDeleteBin2Fill, RiEditFill } from '@remixicon/react'
import { TableActionType, TableHeaderType } from '../../types/table.type'

type propsTypes<T> = {
  data: T[];
  headers: TableHeaderType[];
  onCreate: any;
  onEdit: any;
  onDelete: any;
}

const TablesSection = <T>({data, }: propsTypes<T>) => {
  const onHandlerEdit = (row) => {}
  const onHandlerDelete = (row) => {}
  const actions: TableActionType[] = [
    {
      id: 'edit',
      handler: onHandlerEdit,
      icon: <RiEditFill />,
      label: 'Editar'
    },
    {
      id: 'delete',
      handler: onHandlerDelete,
      icon: <RiDeleteBin2Fill />,
      label: 'Editar'
    },
  ];

  return (
    <SimpleGrid columns={1} spacing={8}>
      <Card>
        <CardHeader>
          <Heading size="md">Categorias</Heading>
        </CardHeader>
        <CardBody>
          {itemsCategories && (
            <Quicktable
              data={itemsCategories.map((item) => ({...item, Actions: actions}))}
              headers={TableHeadersCategories}
              keyTable="categories"
              config={{showMenuAction: false}}
            />
          )}
        </CardBody>
      </Card>
    </SimpleGrid>
  )
}

export default TablesSection
