import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder } from '@fortawesome/free-solid-svg-icons';

import './styles.css';

function Repository({ data, repo }) {
  return(
    <li key={repo.id}><FontAwesomeIcon icon={faFolder} /> {repo.name} {data.name}</li>
  )
}

export default Repository;
