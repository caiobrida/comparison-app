import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder } from '@fortawesome/free-solid-svg-icons';

import './styles.css';

function Repository({ data }) {
  return(
    <>
      { data ? data.repositories.map(repo => (
        <li key={repo.id}><FontAwesomeIcon icon={faFolder} /> {repo.name} {data.name}</li>  
      )) : <h1>Empty</h1> }
    </>
  );
}

export default Repository;
