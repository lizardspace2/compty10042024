import React from 'react';
import { Box, Flex, Text, Icon, useColorModeValue, Tooltip } from '@chakra-ui/react';
import { GoPaperclip } from 'react-icons/go';

function TransactionItem() {
  const bgColor = useColorModeValue('gray.50', 'gray.700');
  const dateColor = useColorModeValue('gray.600', 'gray.300');
  const amountColor = useColorModeValue('red.500', 'red.300');
  const hoverBgColor = useColorModeValue('gray.100', 'gray.600');

  return (
    <Flex
      p={4}
      bg={bgColor}
      borderRadius="lg"
      alignItems="center"
      justifyContent="space-between"
      mb={2}
      _hover={{ bg: hoverBgColor, cursor: 'pointer' }}
      transition="background 0.3s ease"
    >
      <Text fontSize="lg" fontWeight="bold" color={dateColor}>
        09 avr.
      </Text>
      <Tooltip hasArrow label="Lier un justificatif à la transaction" placement="top" closeOnClick={false}>
        <Box>
          <Icon as={GoPaperclip} w={5} h={5} sx={{ _hover: { transform: 'scale(1.2)' }, transition: 'transform 0.2s ease-in-out' }} />
        </Box>
      </Tooltip>
      <Box>
        <Text fontWeight="medium">Prlv Sepa Synamobile Rum Recipon</Text>
        <Text fontSize="sm" color={dateColor}>
          Guillaume Marie Franco
        </Text>
      </Box>
      <Text fontSize="lg" color="gray.500">
        Télécom, fournitures, docum.
      </Text>
      <Text fontSize="lg" fontWeight="bold" color={amountColor}>
        -799 €
      </Text>
    </Flex>
  );
}

export default TransactionItem;
