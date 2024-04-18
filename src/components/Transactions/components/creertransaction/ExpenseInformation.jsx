import React, { useState } from 'react';
import { CloseIcon } from '@chakra-ui/icons';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useColorModeValue,
  chakra,
  InputGroup, 
  InputRightElement, 
  IconButton, 
} from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { fr } from 'date-fns/locale';

const ChakraDatePicker = chakra(DatePicker);

const ExpenseInformation = () => {
  const [annotations, setAnnotations] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date()); // Ajout de l'état pour la date sélectionnée
  const inputBg = useColorModeValue('gray.100', 'gray.600');
  const borderColor = useColorModeValue('gray.300', 'gray.700');

  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} borderColor={borderColor}>
      <VStack spacing={4} align="stretch">
        <FormControl id="transaction-label">
          <FormLabel>Libellé</FormLabel>
          <Input
            type="text"
            defaultValue="Prlv Sepa Symamobile Rum Recipon Guillaume Mari"
            background={inputBg}
          />
        </FormControl>

        <FormControl id="transaction-date">
          <FormLabel>Date</FormLabel>
          <ChakraDatePicker
            selected={selectedDate}  // Utilisation de l'état pour la date sélectionnée
            onChange={(date) => setSelectedDate(date)}  // Mise à jour de l'état lors du choix d'une date
            dateFormat="dd/MM/yyyy"
            locale={fr}
            customInput={<Input background={inputBg} readOnly />}
            popperPlacement="bottom-start"
            showWeekNumbers
            calendarStartDay={1}
          />
        </FormControl>

        <FormControl id="transaction-amount">
          <FormLabel>Montant</FormLabel>
          <Input
            type="number"
            defaultValue="-7.99"
            background={inputBg}
            step="0.01"
          />
        </FormControl>

        <FormControl id="transaction-annotations">
          <FormLabel>Annotations</FormLabel>
          <InputGroup>
            <Input
              placeholder="Ajouter des mots clés"
              background={inputBg}
              value={annotations}
              onChange={(e) => setAnnotations(e.target.value)}
            />
            <InputRightElement>
              <IconButton
                aria-label="Clear annotations"
                icon={<CloseIcon />}
                size="sm"
                onClick={() => setAnnotations('')}
                isRound={true}
              />
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <FormControl id="transaction-justifications">
          <FormLabel>Justificatifs</FormLabel>
          <Input
            placeholder="Ajouter des justificatifs"
            background={inputBg}
          />
        </FormControl>
      </VStack>
    </Box>
  );
};

export default ExpenseInformation;
