import Quicktable from '../../components/quicktable'
import { Card, CardBody, CardHeader, Heading, SimpleGrid } from '@chakra-ui/react'
import { RiDeleteBin2Fill, RiEditFill } from '@remixicon/react'
import { TableActionType, TableHeaderType } from '../../types/table.type'

type propsTypes<T> = {
  title: string;
  data: T[];
  headers: TableHeaderType[];
  onCreate: any;
  onEdit: any;
  onDelete: any;
}

const TablesSection = ({title, data, headers, onCreate, onEdit, onDelete}: propsTypes<any>) => {
  const onHandlerCreate = (row: any) => {
    onCreate(row);
  }
  const onHandlerEdit = (row: any) => {
    onEdit(row);
  }
  const onHandlerDelete = (row: any) => {
    onDelete(row)
  }
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
          <Heading size="md">{title}</Heading>
        </CardHeader>
        <CardBody>
          {data && (
            <Quicktable
              data={data.map((item) => ({...item, Actions: actions}))}
              headers={headers}
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
