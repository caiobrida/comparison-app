import React, { useState, useMemo } from 'react';

function RegisterForm({ handleChangeForm }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [avatar, setAvatar] = useState(null);

  const preview = useMemo(
    () => {
      return avatar ? URL.createObjectURL(avatar) : null;
    },
    [avatar]
  );

  return(
    <form>
      <div className='inputGroup'>
        <label
          id='avatar'
          style={{ backgroundImage: `url(${preview})`}}
          className={ avatar ? 'hasAvatar' : null }
        >
          <input type="file" onChange={ e => setAvatar(e.target.files[0]) }/>
          { avatar ? null : <span>+</span> }
        </label>
      </div>

      <div className='inputGroup'>
        <label htmlFor='nameInput'>Name</label>
        <input 
          name='nameInput'
          id='nameInput'
          value={name}
          onChange={ e => setName(e.target.value) }
        />
      </div>

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

      <div className='inputGroup'>
        <label htmlFor='confirmPassInput'>Confirm password</label>
        <input 
          name='confirmPassInput'
          id='confirmPassInput'
          value={confirmPass}
          type='password'
          onChange={ e => setConfirmPass(e.target.value) }
        />
      </div>
      <div className='btnGroup'>
        <button className='mainBtn'>Create Account</button>
        <button onClick={ () => handleChangeForm('login') } className='secondaryBtn'>Cancel</button>
      </div>
    </form>
  );
}

export default RegisterForm;