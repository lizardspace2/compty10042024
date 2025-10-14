import React from 'react';
import Declaration2035 from './components/Declaration2035';
import UpcomingTasks from './components/UpcomingTasks';
import { Box, Flex, Button, useDisclosure, Heading, Icon } from '@chakra-ui/react';
import { FaChevronRight } from "react-icons/fa";

function Todo() {
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true });

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
        <Heading size="lg" color="gray.800">À faire</Heading>
        {!isOpen && (
          <Button
            onClick={onToggle}
            rightIcon={<Icon as={FaChevronRight} />}
            variant="outline"
            borderRadius="xl"
            _hover={{ bg: 'red.50', borderColor: 'red.400' }}
          >
            À venir
          </Button>
        )}
      </Flex>

      <Flex>
        <Box flex="1" p={6} transition="margin 0.3s" marginRight={isOpen ? "400px" : "0"}>
          <Box maxWidth="1400px" textAlign="center" mx="auto">
            <Declaration2035 />
          </Box>
        </Box>
        {isOpen && <UpcomingTasks onClose={onToggle} />}
      </Flex>
    </Box>
  );
}

export default Todo;
