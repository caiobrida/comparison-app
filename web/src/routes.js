import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from './pages/Dashboard';

function Routes() {
  return(
    <Switch>
      <Route exact path='/' component={Dashboard}/>
    </Switch>
  );
}

export default Routes;