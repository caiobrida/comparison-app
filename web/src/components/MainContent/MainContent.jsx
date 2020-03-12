import React from 'react';

import RepositoriesList from '../RepositoriesList/RepositoriesList';

import './styles.css';

function MainContent({ user }) {
  return(
    <main>
      <RepositoriesList user={user} />
    </main>
  );
}

export default MainContent;
