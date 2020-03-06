import React, { useState, useEffect, useCallback } from 'react';

import LoginForm from '../LoginForm/LoginForm';
import RegisterForm from '../RegisterForm/RegisterForm';
import UpdateForm from '../UpdateForm/UpdateForm';
import LoggedAside from '../LoggedAside/LoggedAside';

import './styles.css'

function Aside({ user, decodeUserJwt, deslogUser }) {
  const [error, setError] = useState('');
  const [content, setContent] = useState(null);

  const handleChangeContent = useCallback((form)=>{
    if (form === 'register') setContent(<RegisterForm setError={setError} handleChangeContent={ handleChangeContent }/>);
    else if (form === 'login') setContent(<LoginForm decodeUserJwt={decodeUserJwt} setError={setError} handleChangeContent={ handleChangeContent }/>);
    else if (form === 'update') setContent(<UpdateForm userData={user} decodeUserJwt={decodeUserJwt} setError={setError} handleChangeContent={ handleChangeContent }/>);
    else if (form === 'logged') setContent(<LoggedAside handleChangeContent={ handleChangeContent } deslogUser={deslogUser}/>);
  },[decodeUserJwt, user, deslogUser]);

  useEffect(() => {
    user ? setContent(<LoggedAside handleChangeContent={ handleChangeContent } deslogUser={deslogUser}/>)
         : setContent(<LoginForm decodeUserJwt={decodeUserJwt} setError={setError} handleChangeContent={ handleChangeContent }/>)
  }, [decodeUserJwt, handleChangeContent, setError, deslogUser, user]);


  return(
    <aside>
      { error ? <span className='errorDisplay'>{ error }</span> : null }
      { content }
    </aside>
  );
}

export default Aside;