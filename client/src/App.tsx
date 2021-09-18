import React from 'react';

import './App.css';
import { Switch, Route } from 'react-router-dom';
import Index from './pages/Index';
import { UserProvider } from './context/user.context';
function App() {
  return (
    <div className="App">
      <UserProvider>
        <Switch>
          <Route path="/" exact>
            <Index />
          </Route>
          <Route>
            <h2>404</h2>
          </Route>
        </Switch>
      </UserProvider>
    </div>
  );
}

export default App;
