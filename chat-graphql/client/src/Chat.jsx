import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from '@apollo/client';

import React from 'react';

const client = new ApolloClient({
  uri: 'http://192.168.0.120:3000',
  cache: new InMemoryCache(),
});

const GET_MESSAGES = gql`
  query Messages {
    messages {
      user
      content
    }
  }
`;

const Messages = ({ user }) => {
  const { data } = useQuery(GET_MESSAGES);
  return data
    ? JSON.stringify(data)
    : JSON.stringify({ message: 'Invalid Request' });
};

const Chat = () => (
  <ApolloProvider client={client}>
    <Messages user="Ankur" />
  </ApolloProvider>
);

export default Chat;
