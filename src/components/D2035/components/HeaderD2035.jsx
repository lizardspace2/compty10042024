import React from 'react';
import { useNavigate } from 'react-router-dom'; // Utilisez useNavigate pour la navigation
import {
  Flex,
  Box,
  Heading,
  Button,
  Badge,
  CloseButton,
  useColorModeValue
} from '@chakra-ui/react';
import { FcAlarmClock } from "react-icons/fc";
import { TfiReload } from "react-icons/tfi";

const HeaderD2035 = () => {
  const bgColor = useColorModeValue('gray.100', 'gray.700');
  const borderColor = useColorModeValue('red.100', 'gray.600');
  const navigate = useNavigate(); // Utilisez useNavigate pour la navigation

  // Fonction pour naviguer vers la route '/todo'
  const handleCloseButtonClick = () => {
    navigate('/todo');
  };

  return (
    <Flex
      align="center"
      justify="space-between"
      borderBottom="1px"
      borderColor={borderColor}
      p={4}
      bgColor={bgColor}
    >
      <Box>
        <Heading size="lg" letterSpacing="wider">Compty</Heading>
      </Box>
      <Flex gridGap={4}>
        <Badge colorScheme="green" px={2} py={1} borderRadius="lg">
          Exercice 2023
        </Badge>
        <Flex align="center">
          <Badge colorScheme="purple" px={2} py={1} borderRadius="lg">
            <Flex align="center" gridGap={1}>
              1 fois par an <FcAlarmClock />
            </Flex>
          </Badge>
        </Flex>
        <Flex align="center">
          <Badge colorScheme="blue" px={2} py={1} borderRadius="lg">
            <Flex align="center" gridGap={1}>
              Ouverture le 2 janv. 2024 <TfiReload />
            </Flex>
          </Badge>
        </Flex>
        <Badge colorScheme="red" px={2} py={1} borderRadius="lg">
          À clôturer pour le 18 mai 2024
        </Badge>
      </Flex>
      <Box>
        {/* Utilisez la fonction pour la gestion de l'événement onClick */}
        <CloseButton size="lg" onClick={handleCloseButtonClick} />
      </Box>
    </Flex>
  );
};

export default HeaderD2035;
