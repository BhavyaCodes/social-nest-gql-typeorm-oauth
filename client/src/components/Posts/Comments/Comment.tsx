import { useState } from 'react';
import { gql } from '@apollo/client';
// import { createStyles, makeStyles } from '@mui/styles';
// import { useTheme } from '@mui/styles';
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  Paper,
  // Theme,
  Typography,
} from '@mui/material';
import { useHistory } from 'react-router';
import { useUser } from '../../../context/user.context';
import { useRemoveCommentMutation } from '../../../__generated__/src/lib/mutations.graphql';
import { FindCommentsByPostQuery } from '../../../__generated__/src/lib/queries.graphql';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export function Comment({
  comment,
  postId,
  commentCount,
}: {
  comment: FindCommentsByPostQuery['findCommentsByPost'][0];
  postId: string;
  commentCount: number;
}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { user } = useUser();
  const history = useHistory();
  const [removeCommentMutation] = useRemoveCommentMutation();
  const handleDeleteComment = () => {
    console.log('here?');
    removeCommentMutation({
      variables: {
        removeCommentId: comment.id,
      },
      update(cache, obj) {
        const { data } = obj;
        if (data) {
          const normalizedId = cache.identify(data.removeComment);
          cache.evict({ id: normalizedId });
          cache.gc();
        }
        cache.writeFragment({
          id: cache.identify({ __typename: 'Post', id: postId }),
          fragment: gql`
            fragment UpdateCommentCount on Post {
              commentCount
            }
          `,
          data: {
            commentCount: commentCount - 1,
          },
        });
      },
      optimisticResponse: {
        removeComment: {
          __typename: 'Comment',
          id: comment.id,
        },
      },
    }).catch((e) => console.log(e));
  };

  //modal
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <Box>
      <Divider sx={{ marginBottom: 1, marginTop: 1 }} />
      <Box sx={{ display: 'flex' }}>
        <Avatar
          onClick={() => history.push(`/profile/${comment.user.id}`)}
          sx={{ cursor: 'pointer', width: 24, height: 24, my: 1 }}
          alt={comment.user.name}
          src={comment.user?.imageUrl as string}
          imgProps={{
            referrerPolicy: 'no-referrer',
          }}
        />
        <Paper
          sx={{
            p: 1,
            mx: 2,
            flexGrow: 1,
            borderRadius: 1,
            bgcolor: 'secondary.light',
            // color: 'secondary.contrastText',
            // bgcolor: (t) => t.palette.secondary.light,
          }}
        >
          <Box sx={{ display: 'flex', color: 'secondary.contrastText' }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography
                variant="subtitle2"
                sx={{ color: 'secondary.contrastText' }}
              >
                {comment.user.name}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: 'secondary.contrastText' }}
              >
                {comment.content}
              </Typography>
            </Box>

            {comment.user.id === user?.id && (
              // <Button
              //   type="button"
              //   onClick={handleDeleteComment}
              //   variant="contained"
              //   // color="secondary"
              // >
              //   Delete Comment
              // </Button>
              <IconButton
                aria-label="more"
                // id="long-button"
                aria-controls="long-menu"
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
              >
                <MoreVertIcon
                // sx={{ color: 'theme.secondary.contrastText' }}
                // color={}
                />
              </IconButton>
            )}
          </Box>
          <Menu
            id="comment-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem
              // onClick={() => {
              //   // handleDeleteComment();
              //   // handleClose();
              // }}
              onClick={handleModalOpen}
            >
              Delete Comment
            </MenuItem>
          </Menu>
        </Paper>
      </Box>
      {/* modal */}
      <Dialog
        open={modalOpen}
        onClose={handleModalOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Are you sure you want to delete this comment?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {comment.content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose}>cancel</Button>
          <Button
            onClick={() => {
              handleDeleteComment();
              handleModalClose();
            }}
            autoFocus
          >
            delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
