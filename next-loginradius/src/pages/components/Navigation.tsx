import { Heading, Center, VStack, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useLRAuth } from 'loginradius-react';

export default function Navigation() {
  const { isLoading, isAuthenticated, error, user, logout, loginWithRedirect } =
    useLRAuth();
  const router = useRouter();
  useEffect(() => {
    if (user && isAuthenticated) {
      router.push(`/profile`);
    }
  }, [router, user, isAuthenticated]);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Oops... {error.message}</div>;
  }
  return (
    <Center pt={10}>
      <VStack spacing={[6, 8]}>
        <Heading as="h2">Welcome to Openreplay Authentication Platform</Heading>
        <Text
          fontSize="3xl"
          onClick={() => (isAuthenticated ? logout() : loginWithRedirect())}
        >
          {isAuthenticated ? `Logout` : `Login`}
        </Text>
      </VStack>
    </Center>
  );
}
