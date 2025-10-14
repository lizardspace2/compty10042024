import { Box, Text, Container } from "@chakra-ui/react";

const Header = () => {
  return (
    <Box as="header" bg="white" py={4} boxShadow="sm">
      <Container maxW="container.xl">
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center" gap={2}>
            <Box
              w={10}
              h={10}
              bgGradient="linear(to-br, red.400, red.500)"
              borderRadius="xl"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Text color="white" fontSize="xl" fontWeight="bold">
                S
              </Text>
            </Box>
            <Text fontSize="xl" fontWeight="bold" color="gray.800">
              Superprof
            </Text>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Header;
