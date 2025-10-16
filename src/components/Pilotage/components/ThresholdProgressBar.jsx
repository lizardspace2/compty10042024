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
  Skeleton,
  Badge,
  HStack,
} from '@chakra-ui/react';
import { IoInformationCircleOutline } from 'react-icons/io5';
import { useDashboardData } from '../hooks/useDashboardData';

function ThresholdProgressBar() {
  const theme = useTheme();
  const { data, loading } = useDashboardData();
  const bgColor = useColorModeValue('red.50', theme.colors.gray[800]);
  const borderColor = useColorModeValue(theme.colors.gray[200], theme.colors.gray[700]);

  if (loading || !data?.threshold) {
    return (
      <Box p={4} bg={bgColor} borderRadius="lg" boxShadow="md" borderWidth="1px" borderColor={borderColor}>
        <Skeleton height="200px" />
      </Box>
    );
  }

  const threshold = data.threshold;
  const pourcentageAtteint = threshold.pourcentage_seuil || 0;
  const caRestant = threshold.ca_restant_avant_seuil || 0;
  const projectionAnnuelle = threshold.projection_annuelle || 0;
  const risqueDepassement = threshold.risque_depassement || false;

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
          <HStack>
            <Text fontSize="lg" fontWeight="semibold">
              Seuil Micro-BNC (77 700€)
            </Text>
            {risqueDepassement && (
              <Badge colorScheme="red" fontSize="xs">Risque dépassement</Badge>
            )}
          </HStack>
          <Tooltip hasArrow label="Seuil du régime micro-BNC : 77 700€ de chiffre d'affaires annuel" aria-label="Information tooltip">
            <span>
              <IoInformationCircleOutline size="1.25em" />
            </span>
          </Tooltip>
        </Flex>

        <HStack justify="space-between" mb={2}>
          <Text fontWeight="bold" color={pourcentageAtteint > 100 ? 'red.500' : 'green.600'}>
            {pourcentageAtteint > 100 ? 'Dépassé' : 'En cours'}
          </Text>
          <Text fontSize="sm" color="gray.600">
            {pourcentageAtteint.toFixed(1)}% atteint
          </Text>
        </HStack>

        <Box position="relative">
          <Progress
            value={Math.min(pourcentageAtteint, 100)}
            colorScheme={pourcentageAtteint > 90 ? 'red' : pourcentageAtteint > 75 ? 'orange' : 'green'}
            size="lg"
            borderRadius="md"
          />
        </Box>

        <Flex justify="space-between" mt={2} flexWrap="wrap" gap={2}>
          <VStack align="start" spacing={0}>
            <Text fontSize="xs" color="gray.600">CA actuel</Text>
            <Text color={theme.colors.blue[600]} fontWeight="bold">
              {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(threshold.ca_actuel)}
            </Text>
          </VStack>
          <VStack align="start" spacing={0}>
            <Text fontSize="xs" color="gray.600">Restant avant seuil</Text>
            <Text color={caRestant > 0 ? theme.colors.green[500] : theme.colors.red[500]} fontWeight="bold">
              {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(Math.abs(caRestant))}
            </Text>
          </VStack>
          <VStack align="start" spacing={0}>
            <Text fontSize="xs" color="gray.600">Projection annuelle</Text>
            <Text color={theme.colors.purple[600]} fontWeight="bold">
              {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(projectionAnnuelle)}
            </Text>
          </VStack>
        </Flex>

        <Text fontSize="sm" color="gray.700">
          {pourcentageAtteint > 100
            ? "⚠️ Vous avez dépassé le seuil du régime micro-BNC. Consultez votre expert-comptable pour les implications fiscales."
            : pourcentageAtteint > 75
            ? "📊 Attention, vous approchez du seuil. Surveillez votre chiffre d'affaires pour éviter un dépassement."
            : "✅ Vous êtes en dessous du seuil. Continuez à surveiller votre progression."}
        </Text>

        <Link color={theme.colors.blue[500]} fontWeight="bold" fontSize="sm">
          En savoir plus sur le régime micro-BNC
        </Link>
      </VStack>
    </Box>
  );
}

export default ThresholdProgressBar;
