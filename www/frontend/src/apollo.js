import { ApolloClient } from 'apollo-client';
import { ApolloLink, concat, split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { getMainDefinition } from 'apollo-utilities';

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      'X-Token': localStorage.getItem('token') || null,
    }
  });

  return forward(operation);
});

const httpLink = new HttpLink({
  uri: 'http://localhost/graphql',
});

export const wsLink = new WebSocketLink({
  uri: `ws://localhost/subscriptions`,
  options: {
    reconnect: true,
    lazy: true,
    connectionParams: () => ({
      token: localStorage.getItem('token'),
    }),
  },
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link: concat(authMiddleware, link),
  cache: new InMemoryCache(),
});

export default client;
