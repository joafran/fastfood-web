import React from 'react';
import { Route, Switch } from 'react-router';
import Orders from './components/Pages/Orders';

const App = () => {
  return (
    <Switch>
      <Route path="/" component={Orders}/>
    </Switch>
  );
}

export default App;
