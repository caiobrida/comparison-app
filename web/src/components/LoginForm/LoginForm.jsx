import React, { useState, useEffect } from 'react';

import auth from '../../services/authService';

function LoginForm({ handleChangeContent, setError, decodeUserJwt }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    setError('');
  }, [setError]);

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await auth.login(email, password);
    if (res.status === 400) setError(res.message);
    else decodeUserJwt();
  }

  return(
    <form onSubmit={handleSubmit}>
      <div className='inputGroup'>
        <label htmlFor='emailInput'>Email</label>
        <input 
          name='emailInput'
          id='emailInput'
          value={email}
          onChange={ e => setEmail(e.target.value) }
        />
      </div>

      <div className='inputGroup'>
        <label htmlFor='passwordInput'>Password</label>
        <input 
          name='passwordInput'
          id='passwordInput'
          value={password}
          type='password'
          onChange={ e => setPassword(e.target.value) }
        />
      </div>
      <div className='btnGroup'>
        <button className='mainBtn'>Log in</button>
        <button type='button' onClick={ () => handleChangeContent('register') } className='secondaryBtn'>Sign in</button>
      </div>
    </form>
  );
}

export default LoginForm;
