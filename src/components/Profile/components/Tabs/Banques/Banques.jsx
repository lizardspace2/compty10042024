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
      <Box>
        <AccountSection accounts={accountsData} />
      </Box>
    );
  }