import React from 'react';
import { Flex, Heading, Menu } from '@chakra-ui/react';

const AccompagnementBanner = () => {
  const yearOptions = ['Exercice 2024', 'Exercice 2023', 'Exercice 2022'];

  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      borderBottom="1px"
      borderColor="gray.200" // Match the borderColor of TransactionsHeader
      p={4}
      boxShadow="sm" // Match the boxShadow of TransactionsHeader
    >
      <Heading size="md">Accompagnement</Heading>
      <Flex>
        <Menu>
        </Menu>
      </Flex>
    </Flex>
  );
};

export default AccompagnementBanner;
