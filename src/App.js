import './App.css';
import NavBar from './components/NavBar';
import Picker from './components/Picker';
import Login from './components/Login';

import { Router, Link } from "@reach/router"

function App() {
  return (
    <div>
      <NavBar/>
      <div className="App-body">
        <Router>
          <Picker path="/" />
          <Login path="login" />
        </Router>
      </div>
    </div>
  );
}

export default App;
