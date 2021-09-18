import './App.css';
import NavBar from './components/NavBar';
import Picker from './components/Picker';

function App() {
  return (
    <div>
      <NavBar/>
      <div className="App-body">
        <Picker/>
      </div>
    </div>
  );
}

export default App;
