import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { BillingForm } from './components/BillingForm ';

export function Options() {
  return (
    <Flex width="100%" justifyContent="center" pt="4" pb="4"> {/* Padding top and bottom for some space */}
      <Box maxWidth="1000px" width="100%" px="4"> {/* Padding is optional, for some space on the sides */}
        <BillingForm/>
      </Box>
    </Flex>
  );
}
