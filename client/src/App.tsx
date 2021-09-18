import { Switch, Route } from 'react-router-dom';
import Index from './pages/Index';
import { UserProvider } from './context/user.context';
import Layout from './components/Layout';
import Profile from './pages/Profile';
function App() {
  return (
    <UserProvider>
      <Layout>
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
    </UserProvider>
  );
}

export default App;
