import { Text, Box, Center, Heading } from '@chakra-ui/react';

import { useLRAuth } from 'loginradius-react';
export default function Profile() {
  const { user, isLoading, isAuthenticated } = useLRAuth();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isAuthenticated) {
    return (
      <Box>
        <Heading ml="300" pt="20">
          Welcome to your profile {user?.Email[0].Value}
        </Heading>
        <Center mt={10}>
          <Text fontSize="3xl">You have been Authenticated, Horraay!!!</Text>
        </Center>
      </Box>
    );
  }
}
