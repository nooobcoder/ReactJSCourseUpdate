import { Box } from '@chakra-ui/react';
import Nav from './Navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box h="100vh" bg="blue.100">
      <Box>{children}</Box>
      <Nav />
    </Box>
  );
}
