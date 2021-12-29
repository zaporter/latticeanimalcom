import LatticeAnimalDemo from './components/LatticeAnimalDemo.js';

function App() {
  return (
    <div className="App">
        Hello and welcome to latticeanimal.com. This website is devoted to fun (and often math related) websites that I want to create. It is named after the mathematical construct of a lattice animal (also known as a Polyomino <a href="https://en.wikipedia.org/wiki/Polyomino">wikipedia.org/wiki/Polyomino</a>). 
        <br/>
        <br/>
        Here is little demo allowing you see different orders (sizes) of different polyominoes and their respective type (or uniqueness criterion).  

        I have constrainted the maximum and minimum size because while I am using the Redelmeier method for fixed polomino generation, the free and one-sided checks are compute intensive and javascript isn't fast.
        <LatticeAnimalDemo/>
    </div>
  );
}

export default App;
