//App.js 
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import  './HomeComponent';
import  './components/PortfolioComponent';


function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<HomeComponent />} />
        
		<Route path="/portfolio" element={<PortfolioComponent />} />
		
      </Routes>
    </Router>
  );
}

export default App;


