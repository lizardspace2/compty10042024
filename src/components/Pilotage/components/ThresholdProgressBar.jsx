import React from 'react';
import {
  Box,
  Progress,
  Text,
  Flex,
  Tooltip,
  useTheme,
  Link,
  VStack,
} from '@chakra-ui/react';
import { IoInformationCircleOutline } from 'react-icons/io5';

function ThresholdProgressBar() {
  const { colors } = useTheme();
  const threshold = 34; // your threshold percentage
  const charges = -32; // your charges percentage
  const margin = 3055.05; // your margin value

  return (
    <Box
      p={4}
      bg={bgColor}
      borderRadius="lg"
      boxShadow="md"
      borderColor={borderColor}
      borderWidth={1}
      maxW="100%"
      overflowX="auto"
    >
      <VStack spacing={4} align="stretch">
        <Flex justify="space-between" align="center">
          <Text fontSize="lg" fontWeight="semibold">
            Arbitrage micro ou réel
          </Text>
          <Tooltip label="Information" aria-label="Information tooltip">
            <Box as={IoInformationCircleOutline} />
          </Tooltip>
        </Flex>
        <Text fontWeight="bold">Sous le seuil</Text>
        <Box position="relative">
          <Progress value={Math.abs(charges)} colorScheme="teal" size="lg" />
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
        <Flex justify="space-between" mt={2}>
          <Text color={colors.red[500]} fontWeight="bold">
            Charges: {charges}%
          </Text>
          <Text color={colors.green[500]} fontWeight="bold">
            Marge: {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(margin)}
          </Text>
        </Flex>
        <Text fontSize="sm">
          Vous êtes actuellement sous le seuil de charges à partir duquel il est intéressant de passer aux frais réels. Dès janvier, finalisez votre comptabilité pour avoir une estimation plus précise.
        </Text>
        <Link color={colors.blue[500]} fontWeight="bold">
          En savoir plus
        </Link>
      </VStack>
    </Box>
  );
}

export default ThresholdProgressBar;
