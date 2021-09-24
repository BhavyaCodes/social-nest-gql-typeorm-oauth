import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import { useGetLikesByPostQuery } from '../../__generated__/src/lib/queries.graphql';
import { useHistory } from 'react-router';

export interface ViewLikesProps {
  postId: string;
  onClose: () => void;
}

export default function ViewLikes(props: ViewLikesProps) {
  const history = useHistory();
  const [open, setOpen] = React.useState<boolean>(true);
  const { postId, onClose } = props;
  const {
    loading,
    data: getUsersWhoLikePostData,
    error,
  } = useGetLikesByPostQuery({
    variables: { postId },
  });

  console.log(getUsersWhoLikePostData?.post);

  const handleClose = () => {
    onClose();
    setOpen(false);
  };

  if (loading) {
    return (
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Loading</DialogTitle>
      </Dialog>
    );
  }

  if (error) {
    return (
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Error</DialogTitle>
      </Dialog>
    );
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Users who like this post</DialogTitle>
      <List sx={{ pt: 0 }}>
        {getUsersWhoLikePostData?.post.likes.map((like) => (
          <ListItem
            button
            onClick={() => history.push(`/profile/${like.user.id}`)}
            key={like.user.id}
          >
            <ListItemAvatar>
              <Avatar
                src={like.user.imageUrl || undefined}
                alt={like.user.name}
              >
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={like.user.name} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}
