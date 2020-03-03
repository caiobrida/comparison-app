import React from 'react';

import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import UpdateForm from '../components/UpdateForm';

import '../Sidebar.css';

function Dashboard() {
  return(
    <aside>
      <UpdateForm />
    </aside>
  );
}

export default Dashboard;