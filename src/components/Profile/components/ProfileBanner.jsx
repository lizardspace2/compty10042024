import React from 'react';
import { Flex, Heading } from '@chakra-ui/react';

const ProfileBanner = () => {

  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      borderBottom="1px"
      borderColor="gray.200" // Match the borderColor of TransactionsHeader
      p={4}
      boxShadow="sm" // Match the boxShadow of TransactionsHeader
    >
      <Heading size="md">Paramètres</Heading>
      <Flex>

      </Flex>
      
    </Flex>
  );
};

export default ProfileBanner;
