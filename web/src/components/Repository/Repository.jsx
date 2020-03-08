import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder } from '@fortawesome/free-solid-svg-icons';

import './styles.css';

function Repository({ repo }) {
  return(
    <li>
      <FontAwesomeIcon icon={faFolder} /> 
      <span id='name'>{repo.name}</span>
      <span id='date'>{new Date(repo.createdAt).toLocaleString()}</span>
    </li>
  )
}

export default Repository;
