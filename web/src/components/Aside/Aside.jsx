import React, { useState } from 'react';

import LoginForm from '../LoginForm/LoginForm';
import RegisterForm from '../RegisterForm/RegisterForm';
import UpdateForm from '../UpdateForm/UpdateForm';

import './styles.css'

function Aside() {
  const [form, setForm] = useState(<LoginForm handleChangeForm={ handleChangeForm }/>);

  function handleChangeForm(form) {
    if (form === 'register') setForm(<RegisterForm handleChangeForm={ handleChangeForm }/>);
    else if (form === 'update') setForm(<UpdateForm handleChangeForm={ handleChangeForm }/>);
    else setForm(<LoginForm handleChangeForm={ handleChangeForm }/>);
  }

  return(
    <aside>
      { form }
    </aside>
  );
}

export default Aside;