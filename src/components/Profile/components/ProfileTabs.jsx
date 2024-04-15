import { Box, Tabs, TabList, TabPanels, Tab, TabPanel, Heading } from '@chakra-ui/react';
import { Abonnement } from './Tabs/Abonnement/Abonnement';
import { Profil } from './Tabs/Profil/Profil';
import { Declarations } from './Tabs/Declaration/Declarations';
import { Banques } from './Tabs/Banques/Banques';
import { Options } from './Tabs/Options/Options';

function ProfileTabs() {
  return (
    <Box>
      <Tabs isFitted variant="enclosed">
        <TabList mb="1em">
          <Tab>Abonnement</Tab>
          <Tab>Profil</Tab>
          <Tab>Déclarations</Tab>
          <Tab>Banques</Tab>
          <Tab>Options</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {/* Content for Abonnement */}
            <Abonnement/>
          </TabPanel>
          <TabPanel>
            <Profil/>
          </TabPanel>
          <TabPanel>
            <Declarations/>
          </TabPanel>
          <TabPanel>
            <Banques/>
          </TabPanel>
          <TabPanel>
            <Options/>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default ProfileTabs;
