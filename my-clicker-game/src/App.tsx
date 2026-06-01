import { useState, useEffect } from 'react'
import './App.css'
import UpgradeButton from './components/UpgradeButton';

const AUTO_CLICKER_COST = 1000;
const CLICK_POWER_INCREASE = 2;
const UPGRADE_COST_MULTIPLIER = 4;

function App() {
  //How many points the player has
  const [points, setPoints] = useState<number>(0)
  //How mant points player gets per click
  const [clickPower, setClickPower] = useState<number>(1);
  //Auto clicker state
  const [autoClickers, setAutoClickers] = useState<number>(0)
  //cost of upgrade
  const [upgradeCost, setUpgradeCost] = useState<number>(100)

  //Use effect
  useEffect(() => {
    const interval = setInterval(() => {
      setPoints((prev) => prev + autoClickers)
    }, 1000)

    return () => clearInterval(interval)
  }, [autoClickers])

  function handleClick(): void {
    setPoints((prev) => prev + clickPower);
  }

  function buyClickPowerUpgrade(): void {
    //Checks if the player har enough points
    if(points < upgradeCost) return;

    //Subtract points
    setPoints((prev) => prev - upgradeCost);
    //Increase click power
    setClickPower((prev) => prev + CLICK_POWER_INCREASE);
    //Increase Cost
    setUpgradeCost((prev) => prev * UPGRADE_COST_MULTIPLIER);
  }

  function buyAutoClicker(): void {
    //Checks if the player har enough points
    if(points < AUTO_CLICKER_COST) return;
    //Subtract points
    setPoints((prev) => prev - AUTO_CLICKER_COST);
    //Increase auto clickers
    setAutoClickers((prev) => prev + 1);
  }
  return(
    <main>
      <h1>Clicker Game</h1>
      <p>Points: {points}</p>
      <p>Click Power: {clickPower}</p>
      <p>Auto Clickers: {autoClickers}</p>
      <button onClick={handleClick}> Click</button>

      <hr/>

      <h2>Shop</h2>
      <UpgradeButton
        name="Upgrade Power"
        description="Increase click power by 2"
        cost={upgradeCost}
        points={points}
        onBuy={buyClickPowerUpgrade}
      />

      <UpgradeButton
        name="Autoclicker"
        description="+1 point per second"
        cost={AUTO_CLICKER_COST}
        points={points}
        onBuy={buyAutoClicker}
      />
    </main>
  )
}

export default App;