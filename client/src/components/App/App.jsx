import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Routes from 'routes';

import './App.scss';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes />
      </div>
    </Router>
  );
}

export default App;
