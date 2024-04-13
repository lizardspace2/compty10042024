import { Flex, Text, Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react';
import { IoIosArrowDown } from 'react-icons/io';

const PilotageBanner = () => {
  // Hardcoded year options for the dropdown
  const yearOptions = ['Exercice 2024', 'Exercice 2023', 'Exercice 2022'];

  return (
    <Flex 
    justifyContent="space-between" 
    alignItems="center" 
    boxShadow="sm"           
    borderBottom="1px"
    borderColor="gray.700"
    >
      <Text fontSize="2xl" fontWeight="bold" mr={4}>
        Pilotage
      </Text>
      <Menu>
        <MenuButton as={Button} rightIcon={<IoIosArrowDown />} size="lg" rounded="md">
          {yearOptions[1]} {/* Default selected value */}
        </MenuButton>
        <MenuList>
          {yearOptions.map((year, index) => (
            <MenuItem key={index} value={year}>
              {year}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default PilotageBanner;
