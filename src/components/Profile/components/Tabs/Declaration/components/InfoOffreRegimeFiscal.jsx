import React from 'react';
import { Box, HStack, Link, Text, useColorModeValue } from '@chakra-ui/react';
import { IoMdArrowRoundForward } from 'react-icons/io';
import { FcApproval } from 'react-icons/fc';

const InfoOffreRegimeFiscal = () => {
  const bgColor = useColorModeValue('red.50', 'gray.700');
  const borderColor = useColorModeValue('red.100', 'gray.600');

  return (
    <Box
      p={4}
      backgroundColor={bgColor}
      borderRadius="md"
      border="1px"
      borderColor={borderColor}
      mb={4}
      display="flex"
      alignItems="center"
    >
      <FcApproval size={24} color="teal.500" mr={2} />
      <HStack w="10px"/>
      <Text fontSize="md" ml={2}>
        Compty propose une offre adaptée à votre régime d'imposition : micro ou déclaration contrôlée.
        <br />
        Passez au régime de la déclaration contrôlée, depuis l'onglet Abonnement.
        <Link color="teal.500" href="#abonnement" ml={2} display="inline-flex" alignItems="center">
          En savoir plus <IoMdArrowRoundForward />
        </Link>
      </Text>
    </Box>
  );
};

export default InfoOffreRegimeFiscal;
