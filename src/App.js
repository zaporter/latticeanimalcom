import LatticeAnimalDemo from './components/LatticeAnimalDemo.js';
import './App.css';

function App() {
  return (
    <div className="App" >
      <h1 className='heading'>Lattice Animals Are Cool</h1>

      <div className='item'> 
        Hello and welcome to latticeanimal.com. This website is devoted to fun (and often math related) websites that I want to create. It is named after the mathematical construct of a lattice animal (also known as a Polyomino <a href="https://en.wikipedia.org/wiki/Polyomino">wikipedia.org/wiki/Polyomino</a>). 
        <br/>
        <br/>
        Here is little demo allowing you see different orders (sizes) of different polyominoes and their respective type (or uniqueness criterion).  
        <div style={{'display':'flex','justifyContent':'center'}}>
          <p>
        <LatticeAnimalDemo/>
          </p>
          </div>
      </div>
      <h1 className='heading'>Projects</h1>
      
      <div className='item'>
        <a href="https://www.latticeanimal.com/center-of-the-world/"><h1> Azimuthal Equidistant Projection (Rust + wasmbindgen)</h1> </a>
      </div>
      <div className='item'>
        <a href="https://balancesheet.latticeanimal.com/"><h1> Simple Trusting Group Balance Sheet (Rust + yew)</h1> </a>
      </div>
      <div className='item'>
        <a href="https://latticeanimal.com/distributionexplorer/"><h1> Distribution Explorer (React)</h1></a>
      </div>
      <div className='item'>
        <a href="https://www.latticeanimal.com/mastermind/"><h1> Mastermind Solver (React)</h1> </a>
      </div>
      <h1 className='heading'> About this site</h1>
      <div className='item'>
        If you have any questions or concerns, please contact me on github or send me an email: general@latticeanimal.com (this email may or may not be set up yet.... )
        </div>
      <br/>
    </div>
  );
}

export default App;
