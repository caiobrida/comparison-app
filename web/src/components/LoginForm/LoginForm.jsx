import React, { useState } from 'react';

function LoginForm({ handleChangeForm }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return(
    <form>
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
        <button onClick={ () => handleChangeForm('register') } className='secondaryBtn'>Sign in</button>
      </div>
    </form>
  );
}

export default LoginForm;
