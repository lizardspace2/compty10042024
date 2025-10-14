import React from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Divider,
  Badge,
  StackDivider,
  useColorModeValue
} from '@chakra-ui/react';
import { CheckCircleIcon, EditIcon } from '@chakra-ui/icons';

const VentilationCotisationUrssaf = () => {
  const borderColor = useColorModeValue('red.100', 'gray.600');

  return (
    <Box maxWidth="container.xl" mx="auto" p={5} borderWidth="1px" borderRadius="lg" borderColor={borderColor}>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Cotisations Urssaf à ventiler
      </Text>
      <Text mb={6}>
        Parfait, vous avez bien subdivisé vos cotisations sociales.
      </Text>
      <VStack divider={<StackDivider borderColor={borderColor} />} spacing={4}>
        <HStack justifyContent="space-between">
          <Text>Retrairement De La CURPS</Text>
          <HStack>
            <Badge>Cotisation professionnelle</Badge>
            <Text>0,00 €</Text>
          </HStack>
        </HStack>
        <HStack justifyContent="space-between">
          <Text>Retrairement De La CFP</Text>
          <HStack>
            <Badge>Cotisation sociale Urssaf</Badge>
            <Text>0,00 €</Text>
          </HStack>
        </HStack>
        <HStack justifyContent="space-between">
          <HStack>
            <CheckCircleIcon color="green.500" />
            <Text>Retrairement De La CSG Déductible</Text>
          </HStack>
          <HStack>
            <Badge>CSG déductible</Badge>
            <Text>-6 025,00 €</Text>
          </HStack>
        </HStack>
        <HStack justifyContent="space-between">
          <Text>Retrairement De La CSG-CRDS Non Déductible</Text>
          <HStack>
            <Badge>Dépense personnelle</Badge>
            <Text>-2 570,00 €</Text>
          </HStack>
        </HStack>
      </VStack>
    </Box>
  );
};

export default VentilationCotisationUrssaf;
