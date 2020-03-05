import React from 'react';
import { ToastContainer } from 'react-toastify';

import Header from './components/Header';
import Routes from './routes';

import './App.css'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Header />
      <Routes />
    </div>
  );
}

export default App;
