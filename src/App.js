import { async } from '@firebase/util';
import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import Log from './pages/Log/Log';
import { UserContext } from './context/userContext';
import Private from './pages/Private/Private';
import PrivateHome from './pages/Private/PrivateHome/PrivateHome';

function App() { 

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Log />} />
        <Route path="/private" element={<Private />}>
          <Route path="/private/private-home" element={<PrivateHome />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
