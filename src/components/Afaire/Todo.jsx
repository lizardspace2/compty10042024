import React from 'react';
import Declaration2035 from './components/Declaration2035';
import UpcomingTasks from './components/UpcomingTasks';
import { Box, Flex, Button, useDisclosure, Heading, Icon } from '@chakra-ui/react';
import { FaChevronRight } from "react-icons/fa";

function Todo() {
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
          <Heading size="md">À faire</Heading>
          {!isOpen && (
            // Add the icon to the button using the rightIcon prop
            <Button onClick={onToggle} colorScheme="teal" rightIcon={<Icon as={FaChevronRight} />}>
              À venir
            </Button>
          )}
        </Flex>
        <Box maxWidth="1400px" textAlign="center" mx="auto" >
        <Declaration2035 />
        </Box>
      </Box>
      {isOpen && <UpcomingTasks onClose={onToggle} />}
    </Flex>
  );
}

export default Todo;
