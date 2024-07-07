import logo from './logo.svg';
import './App.css';
import Board from './components/board';

function App() {
  return (
    <div className="App">
      <main className='App-main'>
      
       <h1><img src={logo} className="App-logo" alt="logo" /> Tic-Tac-Toe</h1>
        <Board />
      </main>
    </div>
  );
}

export default App;
