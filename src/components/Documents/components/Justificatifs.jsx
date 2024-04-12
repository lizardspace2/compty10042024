import React from 'react';
import {
  Box,
  Flex,
  Text,
  Button,
  Icon,
  useColorModeValue,
  Tooltip,
} from '@chakra-ui/react';
import { FcInfo } from 'react-icons/fc';

const JustificatifEnAttente = ({ name, date, amount }) => {
  const boxBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const infoIconColor = useColorModeValue('blue.500', 'blue.300');

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      w="full"
      bg={boxBg}
      borderColor={borderColor}
      p={4}
      shadow="sm"
      position="relative"
      my={4}
    >
      <Flex justify="space-between" align="center" mb={2}>
        <Flex align="center">
          <Tooltip label="Informations supplémentaires" hasArrow>
            <Icon as={FcInfo} boxSize={6} mr={2} color={infoIconColor} />
          </Tooltip>
          <Text fontWeight="bold">Justificatifs en attente</Text>
        </Flex>
      </Flex>
      <Flex justify="space-between" align="center" borderWidth="1px" borderRadius="lg" borderStyle="dotted" borderColor="gray.200" p={2}>
        <Box>
          <Text fontWeight="bold">{name}</Text>
          <Text fontSize="sm" color="gray.500">Daté du {date}</Text>
        </Box>
        <Box>
          <Button colorScheme="blue" variant="outline" size="sm" mr={2}>
            Visualiser
          </Button>
          <Text fontWeight="bold">{amount} €</Text>
        </Box>
      </Flex>
    </Box>
  );
};

// Usage example
const Justificatifs = () => {
  return (
    <Box p={5}>
      <JustificatifEnAttente
        name="SYMA MO"
        date="01/10/2022"
        amount="10,00"
      />
    </Box>
  );
};

export default Justificatifs;
