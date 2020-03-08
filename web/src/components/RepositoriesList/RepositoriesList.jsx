import React, { useEffect, useState } from 'react';

import repoService from '../../services/repoService';

import Repository from '../Repository/Repository';

function RepositoriesList() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    async function loadRepos() {
      const { data } = await repoService.getRepos();
      setRepos(data);
    }
    loadRepos();
  }, []);

  return(
    <ul>
      { repos.map(repo => (
        <Repository key={repo.id} repo={repo} />
      )) }
    </ul>
  );
}

export default RepositoriesList;
