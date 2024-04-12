import React from 'react';
import Declaration2035 from './components/Declaration2035';
import UpcomingTasks from './components/UpcomingTasks';
import { Box, Flex, Button, useDisclosure, Heading } from '@chakra-ui/react';

function Todo() {
  // Initialize the useDisclosure hook with isOpen true by default
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true });

  return (
    <Flex>
      <Box flex="1" p={4}>
        <Flex
          justifyContent="space-between"
          alignItems="center"
          borderBottom="1px"
          borderColor="gray.700"
          p={4}
        >
          <Heading>
            À faire
          </Heading>
          {!isOpen && (
            <Button onClick={onToggle} colorScheme="teal">
              À venir
            </Button>
          )}
        </Flex>
        <Declaration2035 />
      </Box>
      {isOpen && <UpcomingTasks onClose={onToggle} />}
    </Flex>
  );
}

export default Todo;
