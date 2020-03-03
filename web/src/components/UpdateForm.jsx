import React, { useState, useMemo } from 'react';

function UpdateForm() {
  const [name, setName] = useState('');
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

      <div className='btnGroup'>
        <button className='mainBtn'>Update</button>
        <button className='secondaryBtn'>Cancel</button>
      </div>
    </form>
  );
}

export default UpdateForm;