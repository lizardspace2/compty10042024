import React from 'react';
import { Box, Flex, Heading } from '@chakra-ui/react';

const PageLayout = ({ title, headerActions, children, maxWidth = "1600px" }) => {
  return (
    <Box bg="gray.50" minH="100vh">
      {/* Header */}
      <Flex
        justifyContent="space-between"
        alignItems="center"
        bg="red.50"
        borderBottom="1px"
        borderColor="red.100"
        p={6}
        boxShadow="sm"
      >
        <Heading size="lg" color="gray.800">
          {title}
        </Heading>
        {headerActions && <Box>{headerActions}</Box>}
      </Flex>

      {/* Content */}
      <Box maxWidth={maxWidth} mx="auto" p={6}>
        {children}
      </Box>
    </Box>
  );
};

export default PageLayout;
