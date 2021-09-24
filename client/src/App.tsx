import { Switch, Route } from 'react-router-dom';
import Index from './pages/Index';
import { UserProvider } from './context/user.context';
import Layout from './components/Layout';
import Profile from './pages/Profile';
import { ThemeProvider } from '@mui/material';
import { lightThemeOptions, darkThemeOptions } from './themes';
import { createTheme, CssBaseline } from '@mui/material';
import useLocalStorage from './hooks/useLocalStorage';
function App() {
  const [darkMode, setDarkMode] = useLocalStorage<boolean>(
    'devgram-theme',
    true,
  );

  console.log('App.tsx', darkMode);

  const theme = createTheme(darkMode ? darkThemeOptions : lightThemeOptions);

  return (
    <UserProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout setDarkMode={setDarkMode}>
          <Switch>
            <Route path="/" exact>
              <Index />
            </Route>
            <Route path="/profile/:profileId" exact>
              <Profile />
            </Route>
            <Route>
              <h2>404</h2>
            </Route>
          </Switch>
        </Layout>
      </ThemeProvider>
    </UserProvider>
  );
}

export default App;
