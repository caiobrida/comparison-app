import React, { useState, useEffect, useCallback } from 'react';

import LoginForm from '../LoginForm/LoginForm';
import RegisterForm from '../RegisterForm/RegisterForm';
import UpdateForm from '../UpdateForm/UpdateForm';
import LoggedAside from '../LoggedAside/LoggedAside';

import './styles.css'

function Aside({ user, logUser, deslogUser, setUser }) {
  const [error, setError] = useState('');
  const [content, setContent] = useState(null);

  const handleChangeContent = useCallback((form)=>{
    if (form === 'register') setContent(<RegisterForm setError={setError} handleChangeContent={ handleChangeContent }/>);
    else if (form === 'login') setContent(<LoginForm logUser={logUser} setError={setError} handleChangeContent={ handleChangeContent }/>);
    else if (form === 'update') setContent(<UpdateForm userData={user} logUser={logUser} setError={setError} handleChangeContent={ handleChangeContent }/>);
    else if (form === 'logged') setContent(<LoggedAside setUser={setUser} handleChangeContent={ handleChangeContent } deslogUser={deslogUser}/>);
  },[logUser, user, deslogUser, setUser]);

  useEffect(() => {
    user ? setContent(<LoggedAside setUser={setUser} handleChangeContent={ handleChangeContent } deslogUser={deslogUser}/>)
         : setContent(<LoginForm logUser={logUser} setError={setError} handleChangeContent={ handleChangeContent }/>)
  }, [logUser, handleChangeContent, setError, deslogUser, user, setUser]);


  return(
    <aside>
      { error ? <span className='errorDisplay'>{ error }</span> : null }
      { content }
    </aside>
  );
}

export default Aside;