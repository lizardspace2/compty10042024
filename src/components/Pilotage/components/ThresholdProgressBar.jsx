import React from 'react';
import {
  Box,
  Progress,
  Text,
  Flex,
  Tooltip,
  Link,
  VStack,
  useTheme,
  useColorModeValue,
} from '@chakra-ui/react';
import { IoInformationCircleOutline } from 'react-icons/io5';

function ThresholdProgressBar() {
  const theme = useTheme();
  const bgColor = useColorModeValue('white', theme.colors.gray[800]);
  const borderColor = useColorModeValue(theme.colors.gray[200], theme.colors.gray[700]);
  const threshold = 34; // Threshold percentage
  const charges = -32; // Charges percentage
  const margin = 3055.05; // Margin value

  return (
    <Box
      p={4}
      bg={bgColor}
      borderRadius="lg"
      boxShadow="md"
      borderWidth="1px"
      borderColor={borderColor}
      maxW="100%"
      overflow="hidden"
    >
      <VStack spacing={4} align="stretch">
        <Flex justify="space-between" align="center">
          <Text fontSize="lg" fontWeight="semibold">
            Arbitrage micro ou réel
          </Text>
          <Tooltip hasArrow label="Information" aria-label="Information tooltip">
            <span>
              <IoInformationCircleOutline size="1.25em" />
            </span>
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
            borderLeft="2px dashed"
            borderColor={theme.colors.gray[300]}
            px={2}
          >
            <Text fontSize="xs" transform="rotate(90deg)" transformOrigin="bottom left">
              Seuil : {threshold}%
            </Text>
          </Box>
        </Box>
        <Flex justify="space-between" mt={2}>
          <Text color={theme.colors.red[500]} fontWeight="bold">
            Charges: {charges}%
          </Text>
          <Text color={theme.colors.green[500]} fontWeight="bold">
            Marge: {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(margin)}
          </Text>
        </Flex>
        <Text fontSize="sm">
          Vous êtes actuellement sous le seuil de charges à partir duquel il est intéressant de passer aux frais réels. Dès janvier, finalisez votre comptabilité pour avoir une estimation plus précise.
        </Text>
        <Link color={theme.colors.blue[500]} fontWeight="bold">
          En savoir plus
        </Link>
      </VStack>
    </Box>
  );
}

export default ThresholdProgressBar;
