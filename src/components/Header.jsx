import { Box, Text, Container } from "@chakra-ui/react";

const Header = () => {
  return (
    <Box as="header" bg="red.50" py={4} boxShadow="sm" borderBottom="1px" borderColor="red.100">
      <Container maxW="container.xl">
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Text fontSize="2xl" fontWeight="bold" color="red.500">
            Compty
          </Text>
        </Box>
      </Container>
    </Box>
  );
};

export default Header;
