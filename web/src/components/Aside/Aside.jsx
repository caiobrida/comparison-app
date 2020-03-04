import React, { useState, useEffect } from 'react';

import LoginForm from '../LoginForm/LoginForm';
import RegisterForm from '../RegisterForm/RegisterForm';
import UpdateForm from '../UpdateForm/UpdateForm';

import './styles.css'

function Aside() {
  const [error, setError] = useState('');
  const [form, setForm] = useState(<LoginForm setError={setError} handleChangeForm={ handleChangeForm }/>);

  function handleChangeForm(form) {
    if (form === 'register') setForm(<RegisterForm setError={setError} handleChangeForm={ handleChangeForm }/>);
    else if (form === 'update') setForm(<UpdateForm setError={setError} handleChangeForm={ handleChangeForm }/>);
    else setForm(<LoginForm setError={setError} handleChangeForm={ handleChangeForm }/>);
  }

  return(
    <aside>
      { error ? <span className='errorDisplay'>{ error }</span> : null }
      { form }
    </aside>
  );
}

export default Aside;