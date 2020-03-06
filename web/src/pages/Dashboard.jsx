import React, { useState, useCallback, useEffect } from 'react';

import auth from '../services/authService';

import Aside from '../components/Aside/Aside';
import MainContent from '../components/MainContent/MainContent';

function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(auth.getCurrentUser());
  }, []);

  const decodeUserJwt = useCallback(() => {
    setUser(auth.getCurrentUser());
  }, []);

  const deslogUser = useCallback(() => { setUser(null) }, []);

  return(
    <div className='container'>
      <Aside deslogUser={deslogUser} decodeUserJwt={decodeUserJwt} user={user}/>
      <MainContent />
    </div>
  );
}

export default Dashboard;
