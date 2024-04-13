import React from 'react';
import {
  Box,
  Flex,
  Text,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';

const TransactionDetailHeader = ({ onClose }) => {
  const headerBgColor = useColorModeValue('white', 'gray.800');
  const detailTextColor = useColorModeValue('gray.600', 'gray.200');
  const buttonBgColor = useColorModeValue('pink.500', 'pink.300'); // Assuming the pink color for the 'Appliquer' button

  return (
    <Flex
      bg={headerBgColor}
      p={3}
      align="center"
      justify="space-between"
      borderBottomWidth="1px"
      borderColor="gray.300"
    >
      <Text
        fontSize="lg"
        fontWeight="semibold"
        flex="1"
        color={detailTextColor}
        isTruncated
      >
        Ventilation de la transaction
      </Text>
      <Text
        fontSize="sm"
        color={detailTextColor}
        flex="2"
        mx={4}
        isTruncated
      >
        CARTE 06/04/24 ALIEXPRESSCOM CB*6654
      </Text>
      <Flex>
        <Button size="sm" variant="outline" onClick={onClose} mr={2}>
          Fermer
        </Button>
        <Button size="sm" bg={buttonBgColor} color="white">
          Appliquer
        </Button>
      </Flex>
    </Flex>
  );
};

export default TransactionDetailHeader;
