import { useState } from 'react';
import './App.css';
import Home from './components/Home/Home';
import NavBar from './components/NavBar/NavBar';
import { MyProvider } from './Context/MyContext';

function App() {

  const [mode, setMode] = useState('dark')

  const toggleMode = () => {
    if (mode == 'dark') {
      setMode('light');
      document.body.style.backgroundColor = '#FFFFFF'
    }
    else {
      setMode('dark');
      document.body.style.backgroundColor = '#050505';
    }
  }

  return (
    <MyProvider>
      <div className="App">
        <NavBar mode={toggleMode} color={mode} />
        <Home mode={toggleMode} color={mode} />
      </div>
    </MyProvider>
  );
}

export default App;
