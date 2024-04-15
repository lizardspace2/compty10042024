import { Box, Button, Flex, Text, Tooltip, useColorModeValue } from '@chakra-ui/react';
import { FiPlus } from 'react-icons/fi';

// This component displays individual account information
const AccountCard = ({ accountName, bankName, amount }) => {
  const bgColor = useColorModeValue('gray.50', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'whiteAlpha.900');

  return (
    <Box p={4} bg={bgColor} boxShadow="md" borderRadius="lg">
      <Flex justifyContent="space-between" alignItems="center">
        <Box>
          <Text fontSize="sm" color={textColor}>
            {accountName}
          </Text>
          <Text fontSize="xs" color={textColor}>
            {bankName}
          </Text>
        </Box>
        <Box textAlign="right">
          <Text fontSize="xl" fontWeight="bold" color={textColor}>
            {amount} €
          </Text>
          <Button size="sm" variant="outline" mt={2}>
            Suspendre
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

// This component displays the overall section with the ability to add an account
const AccountSection = ({ accounts }) => {
  return (
    <Box>
      {accounts.map((account, index) => (
        <AccountCard
          key={index}
          accountName={account.accountName}
          bankName={account.bankName}
          amount={account.amount}
        />
      ))}
      <Tooltip label="Ajouter un compte ou une carte" fontSize="md" placement="top" hasArrow>
        <Button
          leftIcon={<FiPlus />}
          mt={4}
          colorScheme="blue"
          variant="solid"
          size="md"
        >
          Ajouter
        </Button>
      </Tooltip>
    </Box>
  );
};

export default AccountSection;
