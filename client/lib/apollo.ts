import { IncomingMessage, ServerResponse } from 'http';
import { useMemo } from 'react';
import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

export type ResolverContext = {
  req?: IncomingMessage;
  res?: ServerResponse;
};

function createApolloClient(context?: ResolverContext) {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    // link: createIsomorphLink(context),
    uri: 'http://localhost:5000/graphql',
    credentials: 'include',
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            getAllPosts: {
              keyArgs: [
                // 'getAllPostsUserId',
                // 'getUserProfileGetUserProfileById',
                'userId',
                // 'getUserProfileById',
              ],
              // keyArgs: 'type',

              merge(existing = [], incoming) {
                console.log('existing', existing);
                console.log('incoming', incoming);
                return [...existing, ...incoming];
              },
            },
            // user: {
            //   keyArgs: false,
            //   merge(existing = {}, incoming) {
            //     console.log('----', existing);
            //     console.log('----', incoming);
            //     return existing;
            //     // if (!existing.posts) {
            //     //   return existing;
            //     // }
            //   },
            // },
          },
        },
      },
    }),
  });
}

export function initializeApollo(
  initialState: any = null,
  // Pages with Next.js data fetching methods, like `getStaticProps`, can send
  // a custom context which will be used by `SchemaLink` to server render pages
  context?: ResolverContext,
) {
  const _apolloClient = apolloClient ?? createApolloClient(context);

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // get hydrated here
  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState: any) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
