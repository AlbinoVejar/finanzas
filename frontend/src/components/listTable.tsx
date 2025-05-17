import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  SimpleGrid,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Tag,
  TagLabel,
  TagLeftIcon,
  TagRightIcon,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { ExpenseDetails } from '../types/expense.type';
import {
  RiDeleteBin2Line,
  RiEditLine,
  RiShoppingCartFill,
  RiWallet2Fill,
} from '@remixicon/react';

type propsTypes = {
  expenses: ExpenseDetails[];
  actions?: {
    onEditHandler: any;
    onDeleteHandler: any;
  };
};

const ListTable = ({ expenses, actions }: propsTypes) => {
  const variant = useBreakpointValue({
    sm: 1,
    md: 2,
  });

  return (
    <>
      {!!expenses && expenses.length > 0 ? (
        <SimpleGrid
          spacing={4}
          overflowY="auto"
          m="1%"
          maxHeight="50dvh"
          columns={variant}
          width="98%">
          {expenses.map((item: ExpenseDetails) => (
            <Card
              key={item.Id}
              width="100%"
              rounded="lg"
              boxShadow="lg"
              borderWidth={1}
              _hover={{
                borderColor: 'blue.500',
                borderWidth: 3,
              }}
              transition="all 0.2s ease-in-out">
              <CardHeader display="flex" gap={2} p={2}>
                <Tag size="lg" variant="solid" colorScheme="blue">
                  <TagLeftIcon boxSize={4} as={RiWallet2Fill} />
                  <TagLabel>{item.Account}</TagLabel>
                </Tag>
                <Tag size="lg" variant="solid" colorScheme="green">
                  <TagLabel>{item.Category}</TagLabel>
                  <TagRightIcon boxSize={4} as={RiShoppingCartFill} />
                </Tag>
              </CardHeader>
              <CardBody p={2}>
                <Stat>
                  <StatHelpText marginBottom={0}>
                    <strong>Fecha:</strong> {item.Date_expense}
                  </StatHelpText>
                  <StatNumber>$ {item.Amount}</StatNumber>
                  <StatLabel marginBottom={1}>
                    <strong>Descripción:</strong> {item.Description}
                  </StatLabel>
                </Stat>
              </CardBody>
              {!!actions && (
                <CardFooter padding={2}>
                  <Flex width="100%">
                    <ButtonGroup spacing={2} width="100%">
                      <Button
                        w="100%"
                        variant="outline"
                        leftIcon={<RiEditLine />}
                        color="black.700"
                        onClick={() => actions.onEditHandler(item)}>
                        Actualizar
                      </Button>
                      <Button
                        w="100%"
                        variant="ghost"
                        leftIcon={<RiDeleteBin2Line />}
                        color="red.700"
                        onClick={() => actions.onDeleteHandler(item)}>
                        Eliminar
                      </Button>
                    </ButtonGroup>
                  </Flex>
                </CardFooter>
              )}
            </Card>
          ))}
        </SimpleGrid>
      ) : (
        <Text fontSize="2xl">Sin datos</Text>
      )}
    </>
  );
};

export default ListTable;
