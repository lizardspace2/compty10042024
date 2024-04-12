import React from 'react';
import Declaration2035 from './components/Declaration2035';
import UpcomingTasks from './components/UpcomingTasks';
import { Box, Flex, Button, useDisclosure, Heading } from '@chakra-ui/react';

function Todo() {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Flex>
      <Box flex="1" p={4}>
        <Flex p={4} justifyContent="space-between" alignItems="center">
          <Heading  >
            À faire
          </Heading>
          {!isOpen && (
            <Button onClick={onToggle} mt={4} colorScheme="teal">
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
