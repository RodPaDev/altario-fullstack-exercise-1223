import { useState } from 'react'

import Grid from './components/Grid'
import Input from './components/Input'
import Button from './components/Button'
import ClockComponent from './components/Clock'

import 'react-clock/dist/Clock.css';
import './App.css'
import { generateGrid, getGridCode } from './api/grid'

type GridData = {
  grid: string
  code: string
}

function App() {
  const [biasChar, setBiasChar] = useState<string>("")
  const [apiData, setApiData] = useState<GridData | null>(null)

  const onHandleBiasChar = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "" || /^[a-zA-Z]$/.test(e.target.value)) {
      setBiasChar(e.target.value)
    }
  }

  async function handleGenerateGrid() {
    try {
      const grid = await generateGrid(biasChar);
      const code = await getGridCode()
      setApiData({ grid, code })
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='main-page'>
      <div className='main-content'>
        <div className='header'>
          <Input
            placeholder='Character'
            label='Character'
            onChange={onHandleBiasChar}
            value={biasChar} />
          <ClockComponent />
          <Button label='GENERATE 2D GRID' onClick={handleGenerateGrid} />
        </div>
        <Grid data={apiData?.grid} />
        <div className='grid-status-container'>
          <div className='grid-status-indicator-container'>
            <div className='grid-status-indicator'></div>
            <span>OFFLINE</span>
          </div>

          <div className='grid-status-code-container'>
            {apiData?.code ?
              <span>
                YOUR CODE: <strong>{apiData.code}</strong>
              </span>
              :
              <span className=''>AWAITING GRID GENERATION</span>
            }

          </div>
        </div>
      </div>
    </div>
  )
}

export default App
