import React from 'react';

import LoginForm from '../components/LoginForm';

import '../Sidebar.css';

function Dashboard() {
  return(
    <aside>
      <LoginForm />
    </aside>
  );
}

export default Dashboard;