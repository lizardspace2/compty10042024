import React from 'react';
import {
  Box,
  Flex,
  Text,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';

const TransactionDetailHeader = () => {
  const headerBgColor = useColorModeValue('gray.100', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.100');

  return (
    <Flex
      bg={headerBgColor}
      p={3}
      align="center"
      justify="space-between"
      borderBottomWidth="1px"
      borderColor="gray.200"
    >
      <Text
        fontSize="lg"
        fontWeight="semibold"
        color={textColor}
        isTruncated
      >
        Ventilation de la transaction
      </Text>
      <Text
        fontSize="sm"
        color={textColor}
        isTruncated
        flex="1"
        mx={4}
      >
        PRLV SEPA SYMAMOBILE PRLVSYMAMOBILE39738720240407-0773020538- CACP.254179616.4496 RUM SYMAGENCRUC39738720221011091753 RECIPON-GUILLAUME MARIE FRANCO
      </Text>
      <Flex>
        <Button size="sm" variant="ghost" mr={2}>
          Fermer
        </Button>
        <Button size="sm" colorScheme="pink">
          Appliquer
        </Button>
      </Flex>
    </Flex>
  );
};

export default TransactionDetailHeader;
