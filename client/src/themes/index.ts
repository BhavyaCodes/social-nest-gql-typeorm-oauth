import { ThemeOptions } from '@mui/material';
import { lime } from '@mui/material/colors';
// import { createTheme } from '@mui/material/styles';

// declare module '@mui/material/styles' {
//   interface Theme {
//     // status: {
//     //   danger: string;
//     // },
//     // palette: {
//     // 	secondary: {
//     // 		main: 'dgd',
//     // 		light: 'dgd',
//     // 		dark: 'dgd',
//     // 		contrastText: rgba(0,0,0,0.8)
//     // 	}
//     // }
//   }
//   // allow configuration using `createTheme`
//   interface ThemeOptions {
//     status?: {
//       danger?: string;
//     };
//   }
// }

// export const lightTheme = createTheme({
//   palette: {
//     secondary: lime,
//   },
// });

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
