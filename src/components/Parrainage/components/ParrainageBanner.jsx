import React from 'react';
import { Flex, Heading } from '@chakra-ui/react';

const ParrainageBanner = () => {

  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      borderBottom="1px"
      borderColor="red.100" // Match the borderColor of TransactionsHeader
      p={4}
      boxShadow="sm" // Match the boxShadow of TransactionsHeader
    >
      <Heading size="md">Parrainage</Heading>
      <Flex>
      </Flex>      
    </Flex>
  );
};

export default ParrainageBanner;
