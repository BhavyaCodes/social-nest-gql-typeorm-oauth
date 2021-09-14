import { AppProps } from 'next/app';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { UserProvider } from '../context/user.context';
import createEmotionCache from '../src/createEmotionCache';
import { EmotionCache } from '@emotion/cache';
import React from 'react';
import { CacheProvider, ThemeProvider } from '@emotion/react';
import { Head } from 'next/document';
import theme from '../src/theme';
import { CssBaseline } from '@mui/material';
import Layout from '../components/Layout';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const apolloClient = new ApolloClient({
    uri: 'http://localhost:5000/graphql',
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            getAllPosts: {
              keyArgs: false,
              merge(existing = [], incoming) {
                return [...existing, ...incoming];
              },
            },
          },
        },
      },
    }),
    credentials: 'include',
  });

  return (
    <ApolloProvider client={apolloClient}>
      <CacheProvider value={emotionCache}>
        {/* <Head>
          <title>My page</title>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head> */}
        <UserProvider>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </UserProvider>
      </CacheProvider>
    </ApolloProvider>
  );
}
