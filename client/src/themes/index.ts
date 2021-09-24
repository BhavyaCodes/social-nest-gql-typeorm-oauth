import { ThemeOptions } from '@mui/material';

export const lightThemeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    secondary: {
      main: '#90caf9',
      light: 'rgb(166, 212, 250)',
      dark: 'rgb(100, 141, 174)',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
  },
};

export const darkThemeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    secondary: {
      main: '#90caf9',
      light: 'rgb(166, 212, 250)',
      dark: 'rgb(100, 141, 174)',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
  },
};
