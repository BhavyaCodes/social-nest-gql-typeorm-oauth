import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Zoom from '@mui/material/Zoom';
import { useUser } from '../context/user.context';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import {
  Avatar,
  Button,
  IconButton,
  Link as MuiLink,
  Menu,
  MenuItem,
  Tooltip,
  useMediaQuery,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children: React.ReactElement;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

function ScrollTop(props: Props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = (
      (event.target as HTMLDivElement).ownerDocument || document
    ).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', zIndex: 10000, bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Zoom>
  );
}

export default function Layout(props: Props) {
  const { setDarkMode } = props;
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xl'));
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { user, loading } = useUser();

  const renderMenu = () => {
    return user ? (
      <>
        <IconButton onClick={handleClick}>
          <Avatar
            alt={user.name}
            src={user.imageUrl}
            imgProps={{
              referrerPolicy: 'no-referrer',
            }}
          />
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
          <MenuItem onClick={handleClose}>
            <Link
              to={`/profile/${user.id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              My Profile
            </Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <MuiLink color="inherit" underline="none" href="/api/auth/logout">
              Logout
            </MuiLink>
          </MenuItem>
        </Menu>
      </>
    ) : (
      <Button href="/api/auth/google" color="inherit">
        Login
      </Button>
    );
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Box
        sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
      >
        <AppBar>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                DevGram
              </Link>
            </Typography>
            <Tooltip title="Dark Mode">
              <IconButton onClick={() => setDarkMode((s) => !s)}>
                {theme.palette.mode === 'dark' ? (
                  <LightModeIcon />
                ) : (
                  <DarkModeIcon />
                )}
              </IconButton>
            </Tooltip>

            {!loading && renderMenu()}
          </Toolbar>
        </AppBar>
        <Toolbar id="back-to-top-anchor" />
        <Container sx={{ flexGrow: 1 }}>{props.children}</Container>
        <Toolbar></Toolbar>
        <AppBar
          component="footer"
          sx={{
            bottom: 0,
            position: 'sticky',
            top: 'auto',
            // bgcolor: (t) => (matches ? t.palette.grey[900] : 'rgba(0,0,0,0)'),
          }}
        >
          <Toolbar
            variant="dense"
            // disableGutters
            sx={
              {
                // position: 'fixed',
                // bottom: 0,
                // zIndex: 10,
                // width: '100%',
                // bgcolor: (t) => (matches ? t.palette.grey[800] : 'rgba(0,0,0,0)'),
              }
            }
          >
            <IconButton>
              <GitHubIcon />
            </IconButton>
            <IconButton>
              <LinkedInIcon />
            </IconButton>
            <IconButton>
              <TwitterIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>

      <ScrollTop {...props}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </React.Fragment>
  );
}
