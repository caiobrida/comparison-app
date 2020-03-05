import React, { useState, useCallback, useEffect } from 'react';

import auth from '../services/authService';

import Aside from '../components/Aside/Aside';

function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(auth.getCurrentUser());
  }, []);

  const logUser = useCallback(() => {
    setUser(auth.getCurrentUser());
  }, []);

  const deslogUser = useCallback(() => { setUser(null) }, []);

  return(
    <>
      <Aside deslogUser={deslogUser} logUser={logUser} user={user}/>
    </>
  );
}

export default Dashboard;
