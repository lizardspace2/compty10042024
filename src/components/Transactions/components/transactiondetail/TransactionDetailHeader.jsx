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
  const textColor = useColorModeValue('gray.800', 'white');
  const detailBgColor = useColorModeValue('gray.200', 'gray.700');

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
        color={textColor}
        isTruncated
        mr={4}
      >
        Ventilation de la transaction
      </Text>
      <Box
        flex="1"
        bg={detailBgColor}
        p={2}
        borderRadius="md"
      >
        <Text
          fontSize="sm"
          color={textColor}
          isTruncated
        >
          PRLV SEPA SYMAMOBILE PRLVSYMAMOBILE39738720240407-0773020538- CACP.254179616.4496 RUM SYMAGENCRUC39738720221011091753 RECIPON-GUILLAUME MARIE FRANCO
        </Text>
      </Box>
      <Flex>
        <Button size="sm" variant="outline" mr={2} onClick={onClose}>
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
