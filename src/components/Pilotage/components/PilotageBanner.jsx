import { Flex, Box, Text, Select } from '@chakra-ui/react';

function PilotageBanner() {
  // Hardcoded year options for the dropdown
  const yearOptions = [
    { id: 1, label: 'Exercice 2024' },
    { id: 2, label: 'Exercice 2023' },
    { id: 3, label: 'Exercice 2022' },
    // ... add as many years as needed
  ];

  return (
    <Flex direction="column" p={4} boxShadow="md" borderRadius="md">
      <Box mb={4}>
        <Text fontSize="xl" mb={2}>Pilotage</Text>
        <Select placeholder="Choose year" size="md">
          {yearOptions.map((year) => (
            <option key={year.id} value={year.label}>
              {year.label}
            </option>
          ))}
        </Select>
      </Box>
      {/* The rest of your component, such as a chart or other information, would go here */}
    </Flex>
  );
}

export default PilotageBanner;
