import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BattleHistory from './pages/BattleHistory';
import { playBackgroundMusic, stopBackgroundMusic } from './utils/soundManager';
import { useEffect } from 'react';
const App = () => {
  useEffect(() => {
    playBackgroundMusic();
    return () => stopBackgroundMusic();
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/battles" element={<BattleHistory />} />
      </Routes>
    </Router>
  );
};

export default App;
