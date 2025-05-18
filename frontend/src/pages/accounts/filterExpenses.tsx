import {
  Stack,
  FormControl,
  FormLabel,
  Select,
  Button,
  ButtonGroup,
  IconButton,
  useMediaQuery,
  Show,
} from '@chakra-ui/react';
import { RiFilterFill, RiTableFill, RiPieChartBoxFill } from '@remixicon/react';
import { useEffect, useState } from 'react';
import SelectDates from '../../components/selectDates';
import useCategories from '../../hooks/useCategories.hook';
import { useRecoilState } from 'recoil';
import { UserStateType } from '../../types/user.type';
import { UserState } from '../../context/userState';

type propsTypes = {
  isDataExist: boolean;
};

const FilterExpenses = ({ isDataExist }: propsTypes) => {
  const [displayMode, setDisplayMode] = useState<'list' | 'graph'>('list');
  const [isMobileDevice] = useMediaQuery('(max-width: 62em)');
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [userState, setUserState] = useRecoilState<UserStateType>(UserState);
  const { data: itemsCategories } = useCategories().GetItemsCategories();
  useEffect(() => {
    if (Array.isArray(itemsCategories) && itemsCategories.length > 0) {
      setUserState({
        ...userState,
        items: { ...userState.items, categories: itemsCategories },
      });
    }
  }, [itemsCategories]);
  const onChangeCategory = (value: string) => {
    setUserState({...userState, filters: { ...userState.filters, id_category: Number(value)}})
  };
  const onFilterHandler = () => {};
  return (
    <Stack
      direction={['column', 'row']}
      spacing={4}
      padding={4}
      align="end"
      justify="stretch"
      width="100%">
      <Show breakpoint="(max-width: 62em)">
        <Button
          leftIcon={<RiFilterFill />}
          width="100%"
          variant="outline"
          isDisabled={!isDataExist}
          onClick={() => setShowFilter(!showFilter)}>
          Filtros
        </Button>
      </Show>
      {(!isMobileDevice || showFilter) && (
        <>
          <FormControl isDisabled={!isDataExist}>
            <FormLabel>Categorias</FormLabel>
            <Select
              placeholder="Seleccione una Categoría"
              onChange={(event) => onChangeCategory(event.target.value)}>
              {!!itemsCategories &&
                itemsCategories.map((item) => (
                  <option
                    key={`category_table_expenses_${item.Id}`}
                    value={String(item.Id)}>
                    {item.Name}
                  </option>
                ))}
            </Select>
          </FormControl>
          <FormControl isDisabled={!isDataExist}>
            <FormLabel>Fecha</FormLabel>
            <SelectDates />
          </FormControl>
          <FormControl>
            <Button
              width="100%"
              colorScheme="blue"
              isDisabled={!isDataExist}
              onClick={onFilterHandler}>
              Buscar
            </Button>
          </FormControl>
        </>
      )}
      <ButtonGroup
        width="100%"
        justifyContent="flex-start"
        isDisabled={!isDataExist}>
        <IconButton
          width="100%"
          aria-label="Display List"
          backgroundColor={displayMode === 'list' ? 'blue.500' : ''}
          icon={<RiTableFill color={displayMode === 'list' ? 'white' : 'dark'} />}
          onClick={() => setDisplayMode('list')}
        />
        <IconButton
          width="100%"
          aria-label="Display Graph"
          backgroundColor={displayMode === 'graph' ? 'blue.500' : ''}
          icon={
            <RiPieChartBoxFill
              color={displayMode === 'graph' ? 'white' : 'dark'}
            />
          }
          onClick={() => setDisplayMode('graph')}
        />
      </ButtonGroup>
    </Stack>
  );
};

export default FilterExpenses;
