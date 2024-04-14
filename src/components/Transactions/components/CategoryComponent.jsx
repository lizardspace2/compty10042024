import React from 'react';
import { Box, Heading, Tag, VStack, SimpleGrid, Container } from '@chakra-ui/react';

const categories = {
    Revenues: [
      'Apport personnel',
      'Recette',
      'Recette secondaire',
      'Redevance de collaboration perçue',
      'Autre gain divers',
      'Vente d’une immobilisation',
      'Emprunt',
      'Caution reçue'
      // Add other items as necessary
    ],
    Remunerations: [
      'Prélèvement personnel',
      'Dépense personnelle',
      'Rétrocession versée',
      'Redevance de collaboration versée',
      'Honoraires payés',
      '[Salariés] Salaire net',
      '[Salariés] Impôt à la source',
      '[Salariés] Charge sociale',
      // Add other items as necessary
    ],
    Functionnement: [
      'Immobilisation',
      'Matériel et outillage',
      'Achat',
      'Frais divers',
      'Télécom, fournitures, documents',
      'Frais d’acte et de contentieux',
      'Débours pour vos clients',
      'Virement interne',
      // Add other items as necessary
    ],
    Deplacements: [
      'À catégoriser',
      'Formation',
      'Réception et congrès',
      'Restaurant et repas d’affaires',
      'Frais de repas hors domicile',
      'Frais de déplacement',
      'Véhicule et carburant',
      'Location de matériel',
      // Add other items as necessary
    ],
    FraisFixes: [
      'Emprunt',
      'Compte commun ou SCM',
      'Loyer et charge locative',
      'Caution versée',
      'Entretien et réparation',
      'Abonnement logiciel',
      'Eau, gaz, électricité',
      'Assurance professionnelle',
      // Add other items as necessary
    ],
    CotisationsEtTaxes: [
      'Cotisation sociale Urssaf',
      'Cotisation retraite',
      'Cotisation facultative',
      'Cotisation professionnelle',
      'CFE',
      'Autre impôt',
      'Amende et pénalité',
      // Add other items as necessary
    ]
    // Add more categories as needed
  };
  

const CategoryComponent = () => {
  return (
    <Container maxW="container.xl">
      <SimpleGrid columns={4} spacing={5}>
        {Object.keys(categories).map((categoryKey) => (
          <Box p={5} shadow="md" borderWidth="1px" key={categoryKey}>
            <Heading fontSize="xl">{categoryKey}</Heading>
            <VStack align="start">
              {categories[categoryKey].map((item) => (
                <Tag size="md" variant="solid" key={item}>
                  {item}
                </Tag>
              ))}
            </VStack>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default CategoryComponent;
