import React from 'react';
import { Box, Text, Flex, VStack, HStack, Icon, useColorModeValue } from '@chakra-ui/react';
import { FaChevronDown } from 'react-icons/fa';

const AccountSummary = () => {
  const bgColor = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.700', 'white');
  const subTextColor = useColorModeValue('gray.500', 'gray.200');

  return (
    <VStack
      bg={bgColor}
      p={4}
      borderRadius="lg"
      borderWidth="1px"
      borderColor={useColorModeValue('gray.200', 'gray.600')}
      w="full"
      alignItems="flex-start"
    >
      <HStack justifyContent="space-between" w="full">
        <Text fontWeight="semibold" fontSize="lg" color={textColor}>
          Solde total:
        </Text>
        <Box>
          <Flex alignItems="center" color={textColor}>
            <Text fontWeight="bold" fontSize="xl">
              4 972,79 €
            </Text>
            <Icon as={FaChevronDown} ml={1} />
          </Flex>
        </Box>
      </HStack>
      <Box pt={4} w="full">
        <Flex justifyContent="space-between" w="full">
          <VStack alignItems="flex-start">
            <Text fontWeight="bold" color={textColor}>
              1. Boursobank (ex Boursorama)
            </Text>
            <Text fontSize="sm" color={subTextColor}>
              M Recipon Guillaume
            </Text>
          </VStack>
          <VStack alignItems="flex-end">
            <Text fontWeight="bold" fontSize="lg" color={textColor}>
              4 972,79 €
            </Text>
            <Text fontSize="sm" color={subTextColor}>
              le 13/04/2024
            </Text>
          </VStack>
        </Flex>
      </Box>
    </VStack>
  );
};

export default AccountSummary;
