import React from 'react';
import {
  Box,
  Progress,
  Text,
  Flex,
  Tooltip,
  useTheme,
} from '@chakra-ui/react';
import { IoInformationCircleOutline } from 'react-icons/io5';

function ThresholdProgressBar() {
  const { colors } = useTheme();
  const threshold = 34; // your threshold percentage
  const charges = -32; // your charges percentage
  const margin = 3055.05; // your margin value

  return (
    <Box p={4}>
      <Flex justify="space-between" align="center" mb={2}>
        <Text fontSize="lg">Arbitrage micro ou réel</Text>
        <Tooltip label="Information" aria-label="Information tooltip">
          <Box as={IoInformationCircleOutline} />
        </Tooltip>
      </Flex>
      <Text mb={2} fontWeight="bold">Sous le seuil</Text>
      <Box position="relative" mb={4}>
        <Progress value={Math.abs(charges)} colorScheme="teal" />
        <Box
          position="absolute"
          top="50%"
          left={`${threshold}%`}
          transform="translateY(-50%)"
          height="100%"
          borderLeft="2px dashed"
          borderColor="gray.200"
        >
          <Text fontSize="sm" transform="rotate(90deg)" transformOrigin="bottom left">
            Seuil : {threshold}%
          </Text>
        </Box>
      </Box>
      <Flex justify="space-between">
        <Text color={colors.red[500]}>Charges: {charges}%</Text>
        <Text color={colors.green[500]}>Marge: {margin.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</Text>
      </Flex>
    </Box>
  );
}

export default ThresholdProgressBar;
