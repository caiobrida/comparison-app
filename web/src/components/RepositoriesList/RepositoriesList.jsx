import React, { useEffect, useState } from 'react';

import repoService from '../../services/repoService';

import Repository from '../Repository/Repository';

function RepositoriesList() {
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

export default RepositoriesList;
