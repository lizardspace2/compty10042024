import React from 'react';
import { Box } from '@chakra-ui/react';

const Card = ({ children, variant = 'default', ...props }) => {
  const variants = {
    default: {
      bg: 'red.50',
      borderRadius: 'xl',
      p: 6,
      boxShadow: 'sm',
      border: '1px',
      borderColor: 'red.100',
    },
    outlined: {
      bg: 'red.50',
      borderRadius: 'xl',
      p: 6,
      boxShadow: 'sm',
      border: '1px',
      borderColor: 'red.200',
    },
    subtle: {
      bg: 'red.25',
      borderRadius: 'xl',
      p: 6,
      boxShadow: 'sm',
      border: '1px',
      borderColor: 'red.100',
    },
  };

  return (
    <Box {...variants[variant]} {...props}>
      {children}
    </Box>
  );
};

export default Card;
