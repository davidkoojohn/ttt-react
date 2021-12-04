import logo from '../assets/logo.svg';
import './App.css';

import Game from "../Views/Game/Game"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Game/>
    </div>
  );
}

export default App;
