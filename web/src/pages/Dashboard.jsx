import React from 'react';

import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

import '../Sidebar.css';

function Dashboard() {
  return(
    <aside>
      <RegisterForm />
    </aside>
  );
}

export default Dashboard;