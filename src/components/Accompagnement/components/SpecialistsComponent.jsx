import React from 'react';
import { Box, Text, Avatar, AvatarGroup, Flex } from '@chakra-ui/react';

const SpecialistsComponent = () => {
  return (
    <Flex align="center" justify="space-between" p={4} maxW="container.lg" mx="auto">
      <Text fontSize="lg" fontWeight="bold">
        Plus de 10 spécialistes vous accompagnent au quotidien
      </Text>
      <AvatarGroup size="md" max={3}>
        {/* Replace these with actual image paths */}
        <Avatar name="Specialist 1" src="path/to/image1.jpg" />
        <Avatar name="Specialist 2" src="path/to/image2.jpg" />
        <Avatar name="Specialist 3" src="path/to/image3.jpg" />
        {/* Plus symbol to show more than 3 specialists */}
        <Avatar bg="red.500" color="white">
          +70
        </Avatar>
      </AvatarGroup>
    </Flex>
  );
};

export default SpecialistsComponent;
