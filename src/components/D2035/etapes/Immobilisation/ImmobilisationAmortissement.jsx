import React from 'react';
import { Box, Heading, Text, Alert, AlertIcon, AlertDescription, Button, Link } from '@chakra-ui/react';
import { MdOutlineExitToApp } from 'react-icons/md';

const ImmobilisationAmortissement = () => {
  return (
    <Box maxWidth="container.xl" mx="auto" p={5} bg="white">
      <Heading as="h3" fontSize="xl" mb={4}>
        Immobilisations, amortissements et cessions
      </Heading>
      <Text mb={6}>
        Ajoutez l'ensemble de vos immobilisations à votre registre. Indy calculera les amortissements à appliquer et les plus-values en cas de cession.
      </Text>
      <Alert status="info" variant="left-accent" mb={4}>
        <AlertIcon />
        <AlertDescription>
          Dans vos transactions, les achats de matériel et de mobilier supérieurs à 500€ HT doivent être classés dans la catégorie immobilisation.
        </AlertDescription>
      </Alert>
      <Button as={Link} href="#!" rightIcon={<MdOutlineExitToApp />} colorScheme="blue">
        Voir la transaction
      </Button>
    </Box>
  );
};

export default ImmobilisationAmortissement;
