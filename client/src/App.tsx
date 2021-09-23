import { Switch, Route } from 'react-router-dom';
import Index from './pages/Index';
import { UserProvider } from './context/user.context';
import Layout from './components/Layout';
import Profile from './pages/Profile';
import { ThemeProvider } from '@emotion/react';
import { lightTheme } from './themes';
import { CssBaseline } from '@mui/material';
function App() {
  return (
    <UserProvider>
      <ThemeProvider theme={lightTheme}>
        <Layout>
          <Switch>
            <Route path="/" exact>
              <CssBaseline />
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
