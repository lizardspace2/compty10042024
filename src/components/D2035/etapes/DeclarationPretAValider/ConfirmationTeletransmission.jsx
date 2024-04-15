import React from 'react';
import {
  Box,
  VStack,
  Heading,
  Text,
  Button,
  Divider,
  useColorModeValue,
} from '@chakra-ui/react';
import { EmailIcon, AttachmentIcon, EditIcon } from '@chakra-ui/icons';

const ConfirmationTeletransmission = () => {
  const bgColor = useColorModeValue('gray.100', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={5}
      bg={bgColor}
      borderColor={borderColor}
      m={4}
    >
      <VStack spacing={4} align="stretch">
        <Heading as="h3" size="lg">
          Confirmez la télétransmission
        </Heading>
        
        <Divider />

        <Box>
          <EmailIcon boxSize={6} mb={2} />
          <Heading as="h4" size="md" mb={2}>
            Prêt pour la télétransmission ?
          </Heading>
          <Text fontSize="sm" mb={3}>
            Indy va générer un email à destination de votre AGA dont vous recevrez une copie. Il contiendra votre liasse fiscale au format de la télétransmission EDI ainsi qu'une copie PDF de tous les documents de votre comptabilité pour archivage.
          </Text>
        </Box>

        <Box>
          <AttachmentIcon boxSize={6} mb={2} />
          <Heading as="h4" size="md" mb={2}>
            Et après la télétransmission ?
          </Heading>
          <Text fontSize="sm" mb={3}>
            Certaines AGA effectuent tout de suite les premiers contrôles avant de télétransmettre à la DGFIP. D'autres télétransmettent directement votre liasse fiscale aux impôts avant de faire tous les contrôles durant l'été. Dans tous les cas, votre AGA reviendra vers vous avec un rapport d'analyse et éventuellement des questions ou des demandes de modification.
          </Text>
          <Text fontSize="sm">
            Vous avez le droit à l'erreur. Vous pourrez apporter des modifications en rouvrant votre déclaration dans l'onglet documents.
          </Text>
        </Box>
        
        <Divider />

        <Box d="flex" justifyContent="space-between" mt={4}>
          <Button colorScheme="gray" variant="outline">
            Annuler
          </Button>
          <Button colorScheme="blue" variant="solid">
            Télétransmettre
          </Button>
        </Box>
      </VStack>
    </Box>
  );
};

export default ConfirmationTeletransmission;
