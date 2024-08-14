'use client';

import { ApolloProvider, InMemoryCache, ApolloClient } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';

const client = new ApolloClient({
  uri: '/api/graphql',
  cache: new InMemoryCache(),
});

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider>{children}</ChakraProvider>
    </ApolloProvider>
  );
};

export default Providers;
