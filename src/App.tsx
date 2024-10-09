import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DetailsScreen, HomeScreen } from './screens';
import { ApiProvider } from './context/ApiContext';

const App = () => {
  return (
    <ApiProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="details" element={<DetailsScreen />} />
        </Routes>
      </Router>
    </ApiProvider>
  );
};

export default App;
