import React from 'react';

import Repository from '../Repository/Repository';

function RepositoriesList({ data }) {
  return(
    <>
      { data ? data.repositories.map(repo => (
        <Repository data={data} repo={repo} key={repo.id} />  
      )) : <h1>Empty</h1> }
    </>
  );
}

export default RepositoriesList;
