import React from 'react';
import { ToastContainer } from 'react-toastify';

import Header from './components/Header';
import Dashboard from './pages/Dashboard';

import './App.css'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Header />
      <Dashboard />
    </div>
  );
}

export default App;
