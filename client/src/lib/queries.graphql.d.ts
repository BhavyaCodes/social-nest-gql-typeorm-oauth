/* 2d4188c30b4267f7a0a50fad2fb13752cc39bbb0
 * This file is automatically generated by graphql-let. */

import * as Types from "graphql-let/__generated__/__types__";
import * as Apollo from '@apollo/client';
export declare type GetAllPostsQueryVariables = Types.Exact<{
  getAllPostsTimeStamp?: Types.Maybe<Types.Scalars['String']>;
}>;
export declare type GetAllPostsQuery = {
  __typename?: 'Query';
  getAllPosts: Array<{
    __typename?: 'Post';
    id: string;
    content: string;
    createdAt: any;
    likeCount: number;
    hasLiked?: Types.Maybe<boolean>;
    user: {
      __typename?: 'User';
      id: string;
      name: string;
      imageUrl?: Types.Maybe<string>;
    };
  }>;
};
export declare type GetAllPostsFromUserQueryVariables = Types.Exact<{
  getAllPostsTimeStamp?: Types.Maybe<Types.Scalars['String']>;
  getAllPostsUserId?: Types.Maybe<Types.Scalars['String']>;
}>;
export declare type GetAllPostsFromUserQuery = {
  __typename?: 'Query';
  getAllPosts: Array<{
    __typename?: 'Post';
    id: string;
    content: string;
    createdAt: any;
    likeCount: number;
    hasLiked?: Types.Maybe<boolean>;
    user: {
      __typename?: 'User';
      id: string;
      name: string;
      imageUrl?: Types.Maybe<string>;
    };
  }>;
};
export declare type GetUserProfileQueryVariables = Types.Exact<{
  getUserProfileGetUserProfileById: Types.Scalars['String'];
  postsTimeStamp?: Types.Maybe<Types.Scalars['String']>;
}>;
export declare type GetUserProfileQuery = {
  __typename?: 'Query';
  getUserProfile: {
    __typename?: 'User';
    id: string;
    name: string;
    imageUrl?: Types.Maybe<string>;
    posts?: Types.Maybe<Array<{
      __typename?: 'Post';
      id: string;
      content: string;
      createdAt: any;
      likeCount: number;
      hasLiked?: Types.Maybe<boolean>;
      user: {
        __typename?: 'User';
        id: string;
        name: string;
        imageUrl?: Types.Maybe<string>;
      };
    }>>;
  };
};
export declare type GetProfileWithPostsQueryVariables = Types.Exact<{
  getUserProfileGetUserProfileById: Types.Scalars['String'];
  getAllPostsUserId?: Types.Maybe<Types.Scalars['String']>;
  getAllPostsTimeStamp?: Types.Maybe<Types.Scalars['String']>;
}>;
export declare type GetProfileWithPostsQuery = {
  __typename?: 'Query';
  getUserProfile: {
    __typename?: 'User';
    id: string;
    name: string;
    imageUrl?: Types.Maybe<string>;
  };
  getAllPosts: Array<{
    __typename?: 'Post';
    id: string;
    content: string;
    createdAt: any;
    hasLiked?: Types.Maybe<boolean>;
    likeCount: number;
  }>;
};
export declare const GetAllPostsDocument: Apollo.DocumentNode;
/**
 * __useGetAllPostsQuery__
 *
 * To run a query within a React component, call `useGetAllPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllPostsQuery({
 *   variables: {
 *      getAllPostsTimeStamp: // value for 'getAllPostsTimeStamp'
 *   },
 * });
 */

export declare function useGetAllPostsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllPostsQuery, GetAllPostsQueryVariables>): Apollo.QueryResult<GetAllPostsQuery, Types.Exact<{
  getAllPostsTimeStamp?: Types.Maybe<string> | undefined;
}>>;
export declare function useGetAllPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllPostsQuery, GetAllPostsQueryVariables>): Apollo.QueryTuple<GetAllPostsQuery, Types.Exact<{
  getAllPostsTimeStamp?: Types.Maybe<string> | undefined;
}>>;
export declare type GetAllPostsQueryHookResult = ReturnType<typeof useGetAllPostsQuery>;
export declare type GetAllPostsLazyQueryHookResult = ReturnType<typeof useGetAllPostsLazyQuery>;
export declare type GetAllPostsQueryResult = Apollo.QueryResult<GetAllPostsQuery, GetAllPostsQueryVariables>;
export declare const GetAllPostsFromUserDocument: Apollo.DocumentNode;
/**
 * __useGetAllPostsFromUserQuery__
 *
 * To run a query within a React component, call `useGetAllPostsFromUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllPostsFromUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllPostsFromUserQuery({
 *   variables: {
 *      getAllPostsTimeStamp: // value for 'getAllPostsTimeStamp'
 *      getAllPostsUserId: // value for 'getAllPostsUserId'
 *   },
 * });
 */

export declare function useGetAllPostsFromUserQuery(baseOptions?: Apollo.QueryHookOptions<GetAllPostsFromUserQuery, GetAllPostsFromUserQueryVariables>): Apollo.QueryResult<GetAllPostsFromUserQuery, Types.Exact<{
  getAllPostsTimeStamp?: Types.Maybe<string> | undefined;
  getAllPostsUserId?: Types.Maybe<string> | undefined;
}>>;
export declare function useGetAllPostsFromUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllPostsFromUserQuery, GetAllPostsFromUserQueryVariables>): Apollo.QueryTuple<GetAllPostsFromUserQuery, Types.Exact<{
  getAllPostsTimeStamp?: Types.Maybe<string> | undefined;
  getAllPostsUserId?: Types.Maybe<string> | undefined;
}>>;
export declare type GetAllPostsFromUserQueryHookResult = ReturnType<typeof useGetAllPostsFromUserQuery>;
export declare type GetAllPostsFromUserLazyQueryHookResult = ReturnType<typeof useGetAllPostsFromUserLazyQuery>;
export declare type GetAllPostsFromUserQueryResult = Apollo.QueryResult<GetAllPostsFromUserQuery, GetAllPostsFromUserQueryVariables>;
export declare const GetUserProfileDocument: Apollo.DocumentNode;
/**
 * __useGetUserProfileQuery__
 *
 * To run a query within a React component, call `useGetUserProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserProfileQuery({
 *   variables: {
 *      getUserProfileGetUserProfileById: // value for 'getUserProfileGetUserProfileById'
 *      postsTimeStamp: // value for 'postsTimeStamp'
 *   },
 * });
 */

export declare function useGetUserProfileQuery(baseOptions: Apollo.QueryHookOptions<GetUserProfileQuery, GetUserProfileQueryVariables>): Apollo.QueryResult<GetUserProfileQuery, Types.Exact<{
  getUserProfileGetUserProfileById: string;
  postsTimeStamp?: Types.Maybe<string> | undefined;
}>>;
export declare function useGetUserProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserProfileQuery, GetUserProfileQueryVariables>): Apollo.QueryTuple<GetUserProfileQuery, Types.Exact<{
  getUserProfileGetUserProfileById: string;
  postsTimeStamp?: Types.Maybe<string> | undefined;
}>>;
export declare type GetUserProfileQueryHookResult = ReturnType<typeof useGetUserProfileQuery>;
export declare type GetUserProfileLazyQueryHookResult = ReturnType<typeof useGetUserProfileLazyQuery>;
export declare type GetUserProfileQueryResult = Apollo.QueryResult<GetUserProfileQuery, GetUserProfileQueryVariables>;
export declare const GetProfileWithPostsDocument: Apollo.DocumentNode;
/**
 * __useGetProfileWithPostsQuery__
 *
 * To run a query within a React component, call `useGetProfileWithPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProfileWithPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProfileWithPostsQuery({
 *   variables: {
 *      getUserProfileGetUserProfileById: // value for 'getUserProfileGetUserProfileById'
 *      getAllPostsUserId: // value for 'getAllPostsUserId'
 *      getAllPostsTimeStamp: // value for 'getAllPostsTimeStamp'
 *   },
 * });
 */

export declare function useGetProfileWithPostsQuery(baseOptions: Apollo.QueryHookOptions<GetProfileWithPostsQuery, GetProfileWithPostsQueryVariables>): Apollo.QueryResult<GetProfileWithPostsQuery, Types.Exact<{
  getUserProfileGetUserProfileById: string;
  getAllPostsUserId?: Types.Maybe<string> | undefined;
  getAllPostsTimeStamp?: Types.Maybe<string> | undefined;
}>>;
export declare function useGetProfileWithPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProfileWithPostsQuery, GetProfileWithPostsQueryVariables>): Apollo.QueryTuple<GetProfileWithPostsQuery, Types.Exact<{
  getUserProfileGetUserProfileById: string;
  getAllPostsUserId?: Types.Maybe<string> | undefined;
  getAllPostsTimeStamp?: Types.Maybe<string> | undefined;
}>>;
export declare type GetProfileWithPostsQueryHookResult = ReturnType<typeof useGetProfileWithPostsQuery>;
export declare type GetProfileWithPostsLazyQueryHookResult = ReturnType<typeof useGetProfileWithPostsLazyQuery>;
export declare type GetProfileWithPostsQueryResult = Apollo.QueryResult<GetProfileWithPostsQuery, GetProfileWithPostsQueryVariables>;