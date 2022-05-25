import { ApolloClient, InMemoryCache } from '@apollo/client'

// Setup apollo client
export const client = new ApolloClient({
  uri: 'https://modrany.stepzen.net/api/super-reddit/__graphql',
  cache: new InMemoryCache(),
  headers: {
    Authorization: `apikey ${process.env.NEXT_PUBLIC_STEPZEN_API_KEY}`,
  },
})
