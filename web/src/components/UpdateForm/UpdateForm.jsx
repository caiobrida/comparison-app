import React, { useState, useMemo, useEffect } from 'react';

import userService from '../../services/userService';

function UpdateForm({ handleChangeContent, setError }) {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [newAvatar, setNewAvatar] = useState(null);

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

    setAvatar(localStorage.getItem('avatar'));
  }, []);
  
  const preview = useMemo(
    () => {
      return newAvatar ? URL.createObjectURL(newAvatar) : null;
    },
    [newAvatar]
  );

  async function handleSubmit(e) {
    e.preventDefault();

    const data = new FormData();

    data.append('name', name);

    if (newAvatar) data.append('avatar', newAvatar);

    const res = await userService.updateUser(data);
    if (res.status !== 200) setError(res.message);
    else handleChangeContent('logged');
  }
  
  return(
    <form onSubmit={handleSubmit}>
      <div className='inputGroup'>
        <label
          id='avatar'
          style={{ backgroundImage: `url(${preview || avatar})`}}
          className={ avatar ? 'hasAvatar' : null }
        >
          <input type="file" onChange={ e => setNewAvatar(e.target.files[0]) }/>
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

      <div className='btnGroup'>
        <button className='mainBtn'>Update</button>
        <button type='button' onClick={() => handleChangeContent('logged')} className='secondaryBtn'>Cancel</button>
      </div>
    </form>
  );
}

export default UpdateForm;