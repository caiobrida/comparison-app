import React, { useEffect, useState } from 'react';

import auth from '../../services/authService';
import userService from '../../services/userService';

import './styles.css';

function LoggedAside({ deslogUser, handleChangeContent }) {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    async function loadUser() {
      const { message, status, response } = await userService.getUser();
      if (status === 400) return console.log(message);

      const { avatar_url,  name } = response.data;
      setName(name);
      setAvatar(avatar_url);
      localStorage.setItem('avatar', avatar_url);
    }
    loadUser();
  },[])


  function handleLogout() {
    auth.logout();
    deslogUser();
  }

  return(
    <div id='loggedAside'>
      <div id='avatarProfile'><img src={avatar} alt='avatar'/></div>

      <div className='spanGroup'>
        <span>Hello,</span>
        <span id='name' onClick={() => handleChangeContent('update')}>{name} :D</span>
      </div>

      <div className='btnGroup'>
        <button onClick={handleLogout} className='secondaryBtn' type='button'>Sign out</button>
      </div>
    </div>  
  );
}

export default LoggedAside;