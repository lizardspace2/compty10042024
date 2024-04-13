import React from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Input,
  Select,
  FormControl,
  FormLabel,
  Stack,
  useColorModeValue,
  useMultiStyleConfig,
} from '@chakra-ui/react';
import { MdDateRange } from 'react-icons/md';

const FilterPanel = () => {
  const styles = useMultiStyleConfig('Input', {});
  const borderColor = useColorModeValue('gray.300', 'gray.600');

  return (
    <Box p={4} borderWidth="1px" borderRadius="md" borderColor={borderColor} boxShadow="sm">
      <Stack spacing={4}>
        <FormControl>
          <FormLabel>Plage de dates</FormLabel>
          <Input type="text" placeholder="Début - Fin" rightElement={<MdDateRange />} sx={styles.field} />
        </FormControl>
        
        <FormControl>
          <FormLabel>Plage de montants</FormLabel>
          <Input type="number" placeholder="min" sx={styles.field} />
          <Input type="number" placeholder="max" sx={styles.field} />
        </FormControl>
        
        <FormControl>
          <FormLabel>Entrées / sorties</FormLabel>
          <ButtonGroup isAttached variant="outline">
            <Button mr="-px">Tous</Button>
            <Button mr="-px">Entrées</Button>
            <Button>Sorties</Button>
          </ButtonGroup>
        </FormControl>

        <FormControl>
          <FormLabel>Catégories</FormLabel>
          <Select placeholder="Toutes" sx={styles.field}>
            {/* Map your categories here */}
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Justificatifs</FormLabel>
          <ButtonGroup isAttached variant="outline">
            <Button mr="-px">Tous</Button>
            <Button mr="-px">Avec</Button>
            <Button>Sans</Button>
          </ButtonGroup>
        </FormControl>

        <FormControl>
          <FormLabel>Types de transaction</FormLabel>
          <Select placeholder="Toutes" sx={styles.field}>
            {/* Map your transaction types here */}
          </Select>
        </FormControl>
      </Stack>
    </Box>
  );
};

export default FilterPanel;
