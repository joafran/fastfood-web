import React from 'react';
import { Route, Switch } from 'react-router-dom';
import firebase, { FirebaseContext } from './firebase/'

import Menu from './components/Pages/Menu';
import NewFood from './components/Pages/NewFood';
import Orders from './components/Pages/Orders';
import Sidebar from './components/ui/Sidebar';

const App = () => {
  return (
  <FirebaseContext.Provider
    value={{firebase}}
  >
    <div className="md:flex min-h-screen">
      <Sidebar />
      <div className="md:w-3/5 xl:w-4/5">
        <Switch>
          <Route exact path="/" component={Orders}/>
          <Route path="/new-food" component={NewFood}/>
          <Route path="/menu" component={Menu}/>
        </Switch>
      </div>
    </div>
  </FirebaseContext.Provider>  
  );
}

export default App;
