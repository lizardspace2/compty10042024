import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Text
} from '@chakra-ui/react';

const InformationsLegales = () => {
  return (
    <Accordion allowToggle>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              Informations légales
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          Cette offre de parrainage est réservée aux abonnés Compty et non cumulable avec un autre code promotionnel Compty. Compty se réserve la possibilité de modifier ou de mettre fin à tout moment à cette offre moyennant la diffusion d'une information sur cette page parrainage.
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default InformationsLegales;
