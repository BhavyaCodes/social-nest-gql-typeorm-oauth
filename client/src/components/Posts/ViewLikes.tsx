import * as React from 'react';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import { useGetUsersWhoLikedPostQuery } from '../../__generated__/src/lib/queries.graphql';
import { useHistory } from 'react-router';

const emails = ['username@gmail.com', 'user02@gmail.com'];

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
  } = useGetUsersWhoLikedPostQuery({
    variables: { getUsersWhoLikedPostId: postId },
  });

  const handleClose = () => {
    // onClose(selectedValue);
    onClose();
    setOpen(false);
  };

  console.log('ViewLikes');

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
      <DialogTitle>Users who likes this post</DialogTitle>
      <List sx={{ pt: 0 }}>
        {getUsersWhoLikePostData?.getUsersWhoLikedPost.map((user) => (
          <ListItem
            button
            onClick={() => history.push(`/profile/${user.id}`)}
            key={user.id}
          >
            <ListItemAvatar>
              <Avatar src={user.imageUrl || undefined} alt={user.name}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={user.name} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}
