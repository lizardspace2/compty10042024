import React from 'react';
import { Button } from '@chakra-ui/react';

const FinalizeButton = () => {
  return (
    <Button
      bg='pink.400'
      color='white'
      _hover={{ bg: 'pink.500' }}
      borderRadius='full'
      px={12} // padding-left and padding-right
      py={2}  // padding-top and padding-bottom
    >
      Finaliser
    </Button>
  );
};

export default FinalizeButton;
