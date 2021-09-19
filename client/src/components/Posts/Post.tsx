import { v4 as uuidv4 } from 'uuid';
import { useUser } from '../../context/user.context';
import {
  useDeletePostMutation,
  useLikePostMutation,
  useUnlikePostMutation,
} from '../../__generated__/src/lib/mutations.graphql';
import { GetAllPostsQuery } from '../../__generated__/src/lib/queries.graphql';
import { useHistory } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
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
import { Menu, MenuItem } from '@mui/material';
import { useState } from 'react';

export default function PostComponent({
  post,
}: {
  post: GetAllPostsQuery['getAllPosts'][0];
}) {
  const history = useHistory();
  const { user } = useUser();
  const [deletePostMutation] = useDeletePostMutation();
  const [likePostMutation] = useLikePostMutation();
  const [unLikePostMutation] = useUnlikePostMutation();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const deletePost = () => {
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
    <Card sx={{ my: 2 }}>
      <CardHeader
        avatar={
          <Avatar
            onClick={() => history.push(`/profile/${post.user.id}`)}
            alt={post.user.name}
            src={post.user?.imageUrl as string}
            imgProps={{
              referrerPolicy: 'no-referrer',
            }}
          />
        }
        action={
          user?.id === post.user.id && (
            <>
              <IconButton
                aria-label="settings"
                aria-controls="basic-menu"
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem
                  onClick={() => {
                    handleClose();
                    deletePost();
                  }}
                >
                  Delete Post
                </MenuItem>
              </Menu>
            </>
          )
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

      {/* {user?.id === post.user.id && (
        <button onClick={deletePost}>Delete Post</button>
      )} */}
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
