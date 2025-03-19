import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <nav>
          <ul>
            <li><a href="/" className='isActive'>Home</a></li>
            <li><a href="#movies">Films</a></li>
            <li><a href="/support">Support</a></li>
            <li><a href="/login">Login</a></li>
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default App;
