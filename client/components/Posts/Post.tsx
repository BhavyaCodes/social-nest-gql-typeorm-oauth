import { v4 as uuidv4 } from 'uuid';
import { getUser } from '../../context/user.context';
import {
  useDeletePostMutation,
  useLikePostMutation,
  useUnlikePostMutation,
} from '../../__generated__/lib/mutations.graphql';
import { GetAllPostsQuery } from '../../__generated__/lib/queries.graphql';
import Avatar from '@mui/material/Avatar';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useRouter } from 'next/dist/client/router';

export default function PostComponent({
  post,
}: {
  post: GetAllPostsQuery['getAllPosts'][0];
}) {
  const router = useRouter();
  const { user } = getUser();
  const [deletePostMutation] = useDeletePostMutation();
  const [likePostMutation] = useLikePostMutation();
  const [unLikePostMutation] = useUnlikePostMutation();

  const deletePost = () => {
    console.log(post.id);
    deletePostMutation({
      variables: {
        deletePostId: post.id,
      },
      optimisticResponse: {
        deletePost: {
          __typename: 'DeletedItem',
          id: post.id,
        },
      },
      update(cache, { data }) {
        console.log(data);
        const normalizedId = cache.identify({
          id: post.id,
          __typename: 'Post',
        });
        cache.evict({ id: normalizedId });
        cache.gc();
      },
    }).catch((e) => console.log(e));
  };

  const handleLike = () => {
    likePostMutation({
      variables: {
        likePostPostId: post.id,
      },
      optimisticResponse: {
        likePost: {
          id: uuidv4(),
          __typename: 'Like',
          post: {
            __typename: 'Post',
            id: post.id,
            content: post.content,
            userId: post.user.id,
            user: {
              __typename: 'User',
              id: post.user.id,
              name: post.user.name,
              imageUrl: post.user.imageUrl,
            },
            likeCount: post.likeCount + 1,
            hasLiked: true,
          },
        },
      },
    }).catch((e) => console.log(e));
  };

  const handleUnLike = () => {
    unLikePostMutation({
      variables: {
        unLikePostPostId: post.id,
      },
      optimisticResponse: {
        unLikePost: {
          id: uuidv4(),
          __typename: 'Like',
          post: {
            __typename: 'Post',
            id: post.id,
            content: post.content,
            userId: post.user.id,
            user: {
              __typename: 'User',
              id: post.user.id,
              name: post.user.name,
              imageUrl: post.user.imageUrl,
            },
            likeCount: post.likeCount - 1,
            hasLiked: false,
            createdAt: post.createdAt,
          },
        },
      },
    }).catch((e) => console.log(e));
  };

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar
            onClick={() => router.push(`/profile/${post.user.id}`)}
            alt={post.user.name}
            src={post.user.imageUrl}
          />
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={post.user.name}
        subheader={post.createdAt}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {post.content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {user ? (
          <IconButton
            aria-label={post.hasLiked ? 'Like Post' : 'unlike Post'}
            onClick={post.hasLiked ? handleUnLike : handleLike}
          >
            {post.hasLiked ? (
              <FavoriteIcon color="error" />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
        ) : (
          <IconButton
            aria-label="Like Post"
            onClick={() => alert('please login first')}
          >
            <FavoriteBorderIcon />
          </IconButton>
        )}
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
      <p>LikeCount: {post.likeCount}</p>
      {user?.id === post.user.id && (
        <button onClick={deletePost}>Delete Post</button>
      )}
      {/* <p>hasLiked: {JSON.stringify(post.hasLiked)}</p>
      {post.hasLiked === false && (
        <button onClick={handleLike}>Like Post</button>
      )}
      {post.hasLiked === true && (
        <button onClick={handleUnLike}>Unlike Post</button>
      )} */}
    </Card>
  );
}
