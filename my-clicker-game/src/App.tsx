import { useState } from 'react'
import './App.css'

function App() {
  //How many points the player has
  const [points, setPoints] = useState<number>(0)
  //How mant points player gets per click
  const [clickPower, setClickPower] = useState<number>(1);

  //cost of upgrade
  const upgradeCost = 25;

  function handleClick(): void {
    setPoints((prev) => prev + 1)
  }

  return(
    <main>
      <h1>Clicker Game</h1>
      <p>Points: {points}</p>
      
      <button onClick={handleClick}> Click</button>
    </main>
  )
}

export default App;