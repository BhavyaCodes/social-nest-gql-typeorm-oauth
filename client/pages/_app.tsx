import { AppProps } from 'next/app';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
// import { useApollo } from '../lib/apollo';
import { UserProvider } from '../context/user.context';

export default function App({ Component, pageProps }: AppProps) {
  const apolloClient = new ApolloClient({
    uri: 'http://localhost:5000/graphql',
    cache: new InMemoryCache(),
    credentials: 'include',
  });

  return (
    <ApolloProvider client={apolloClient}>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </ApolloProvider>
  );
}
