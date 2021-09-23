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

export const lightThemeOptions = {
  palette: {
    secondary: lime,
  },
};

export const darkThemeOptions = {
  palette: {
    mode: 'dark',
    secondary: lime,
  },
};
