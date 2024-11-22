import { useState } from 'react'
import './App.css'
import GeneratorView, { GridData } from './views/Generator'
import PaymentView from './views/Payment'



function App() {
  const [gridData, setGridData] = useState<GridData | null>(null)

  const handleGridDataUpdate = (gridData: GridData) => {
    setGridData(gridData)
  }

  return (
    <div className='main-page'>
      <div className='main-content'>
        <h1>Altar.io Full-Stack Exercise 1223</h1>
        <GeneratorView gridData={gridData} setGridData={handleGridDataUpdate} />
        <PaymentView gridData={gridData} />
      </div>
    </div>
  )
}

export default App
