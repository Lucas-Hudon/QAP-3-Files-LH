import {useState, useEffect} from 'react';
import './App.css'
import NeighborA from './components/NeighborsA';
import NeighborI from './components/NeighborsI';


// Function to fetch API data and log it into the console
function App() {

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=name,capital,borders,flags")
      .then(res => res.json())
      .then((response) => {
        console.log(response)
      })
      .catch(err => console.log(err));
  }, []);

  
  // Display the header and buttons
  return (
    <>
      <h1>Neighboring Countries</h1>
      <button onClick={<NeighborA />}>NEIGHBORS STARTING WITH A</button>
      <button onClick={<NeighborI />}>NEIGHBORS STARTING WITH I</button>
    </>
  )
}

export default App