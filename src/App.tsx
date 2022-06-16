
import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './components/Home';
import Country from './components/Country';

function App() {
  return (
    <div className='app'>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/country' element={<Country />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;


