/* 8fb14d5a22d5e4c4448c62c92a4904e006ff0039
 * This file is automatically generated by graphql-let. */

import * as Types from "graphql-let/__generated__/__types__";
import * as Apollo from '@apollo/client';
export declare type LikePostMutationVariables = Types.Exact<{
  likePostPostId: Types.Scalars['ID'];
}>;
export declare type LikePostMutation = {
  __typename?: 'Mutation';
  likePost: {
    __typename?: 'Like';
    id: string;
    post: {
      __typename?: 'Post';
      id: string;
      content: string;
      userId: string;
      likeCount: number;
      hasLiked?: Types.Maybe<boolean>;
      user: {
        __typename?: 'User';
        id: string;
        name: string;
        imageUrl?: Types.Maybe<string>;
      };
    };
  };
};
export declare type UnlikePostMutationVariables = Types.Exact<{
  unLikePostPostId: Types.Scalars['ID'];
}>;
export declare type UnlikePostMutation = {
  __typename?: 'Mutation';
  unLikePost: {
    __typename?: 'Like';
    id: string;
    post: {
      __typename?: 'Post';
      id: string;
      content: string;
      userId: string;
      likeCount: number;
      hasLiked?: Types.Maybe<boolean>;
      createdAt: any;
      user: {
        __typename?: 'User';
        id: string;
        name: string;
        imageUrl?: Types.Maybe<string>;
      };
    };
  };
};
export declare type CreatePostMutationVariables = Types.Exact<{
  createPostCreatePostInput: Types.CreatePostInput;
}>;
export declare type CreatePostMutation = {
  __typename?: 'Mutation';
  createPost: {
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
  };
};
export declare type DeletePostMutationVariables = Types.Exact<{
  deletePostId: Types.Scalars['ID'];
}>;
export declare type DeletePostMutation = {
  __typename?: 'Mutation';
  deletePost: {
    __typename?: 'DeletedItem';
    id: string;
  };
};
export declare const LikePostDocument: Apollo.DocumentNode;
export declare type LikePostMutationFn = Apollo.MutationFunction<LikePostMutation, LikePostMutationVariables>;
/**
 * __useLikePostMutation__
 *
 * To run a mutation, you first call `useLikePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likePostMutation, { data, loading, error }] = useLikePostMutation({
 *   variables: {
 *      likePostPostId: // value for 'likePostPostId'
 *   },
 * });
 */

export declare function useLikePostMutation(baseOptions?: Apollo.MutationHookOptions<LikePostMutation, LikePostMutationVariables>): Apollo.MutationTuple<LikePostMutation, Types.Exact<{
  likePostPostId: string;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type LikePostMutationHookResult = ReturnType<typeof useLikePostMutation>;
export declare type LikePostMutationResult = Apollo.MutationResult<LikePostMutation>;
export declare type LikePostMutationOptions = Apollo.BaseMutationOptions<LikePostMutation, LikePostMutationVariables>;
export declare const UnlikePostDocument: Apollo.DocumentNode;
export declare type UnlikePostMutationFn = Apollo.MutationFunction<UnlikePostMutation, UnlikePostMutationVariables>;
/**
 * __useUnlikePostMutation__
 *
 * To run a mutation, you first call `useUnlikePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnlikePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unlikePostMutation, { data, loading, error }] = useUnlikePostMutation({
 *   variables: {
 *      unLikePostPostId: // value for 'unLikePostPostId'
 *   },
 * });
 */

export declare function useUnlikePostMutation(baseOptions?: Apollo.MutationHookOptions<UnlikePostMutation, UnlikePostMutationVariables>): Apollo.MutationTuple<UnlikePostMutation, Types.Exact<{
  unLikePostPostId: string;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type UnlikePostMutationHookResult = ReturnType<typeof useUnlikePostMutation>;
export declare type UnlikePostMutationResult = Apollo.MutationResult<UnlikePostMutation>;
export declare type UnlikePostMutationOptions = Apollo.BaseMutationOptions<UnlikePostMutation, UnlikePostMutationVariables>;
export declare const CreatePostDocument: Apollo.DocumentNode;
export declare type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;
/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      createPostCreatePostInput: // value for 'createPostCreatePostInput'
 *   },
 * });
 */

export declare function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>): Apollo.MutationTuple<CreatePostMutation, Types.Exact<{
  createPostCreatePostInput: Types.CreatePostInput;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export declare type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export declare type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export declare const DeletePostDocument: Apollo.DocumentNode;
export declare type DeletePostMutationFn = Apollo.MutationFunction<DeletePostMutation, DeletePostMutationVariables>;
/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      deletePostId: // value for 'deletePostId'
 *   },
 * });
 */

export declare function useDeletePostMutation(baseOptions?: Apollo.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>): Apollo.MutationTuple<DeletePostMutation, Types.Exact<{
  deletePostId: string;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export declare type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>;
export declare type DeletePostMutationOptions = Apollo.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>;