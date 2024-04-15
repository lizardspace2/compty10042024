import React from 'react';
import { Box } from '@chakra-ui/react';
import AccountSection from './components/AccountSection';

const accountsData = [
  {
    accountName: 'M. Recipon Guillaume',
    bankName: 'BoursoBank (ex Boursorama)',
    amount: '4 935,79'
  },
  // ... other accounts
];

export function Banques() {
  return (
    // Using Box to apply max width and centering
    <Box display="flex" justifyContent="center" alignItems="center" w="100%">
      <Box maxWidth="1000px" w="100%">
        <AccountSection accounts={accountsData} />
      </Box>
    </Box>
  );
}
