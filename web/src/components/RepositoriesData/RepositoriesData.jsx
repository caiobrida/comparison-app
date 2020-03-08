import React, { useEffect, useState } from 'react';

import repoService from '../../services/repoService';

import Repository from '../RepositoriesList/RepositoriesList';

function RepositoriesData() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function loadData() {
      const { data } = await repoService.getRepos();
      setData(data);
    }
    loadData();
  }, []);

  return(
    <ul>
      { data.map(data => (
        <Repository data={data} key={data.id} />
      )) }
    </ul>   
  );
}

export default RepositoriesData;
