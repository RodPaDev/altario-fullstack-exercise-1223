import './App.css'
import GeneratorView from './views/Generator'
import PaymentView from './views/Payment'

function App() {
  return (
    <div className='main-page'>
      <div className='main-content'>
        <GeneratorView />
        <PaymentView />
      </div>
    </div>
  )
}

export default App
