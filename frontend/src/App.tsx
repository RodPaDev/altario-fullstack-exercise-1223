import { useEffect, useRef, useReducer } from 'react';
import {
  Route,
  Routes
} from "react-router-dom";
import GeneratorView from './views/Generator';
import Navbar from './components/Navbar';
import PaymentView from './views/Payment';
import { getPing } from './api/ping';
import { generateGrid, getGridCode } from './api/grid';
import { initialState, reducer } from './state';
import './App.css';

const PING_INTERVAL_MS = 5000;
const GENERATION_STEP_MS = 2000;
const BIAS_COOLDOWN_MS = 4000

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const pingRef = useRef<number | null>(null);
  const generationIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    const checkPingStatus = async () => {
      const ping = await getPing();
      dispatch({ type: 'SET_IS_CONNECTED', payload: ping });
    };

    checkPingStatus();

    pingRef.current = setInterval(checkPingStatus, PING_INTERVAL_MS);

    return () => {
      if (pingRef.current) clearInterval(pingRef.current);
    };
  }, []);

  useEffect(() => {
    if (state.lastBiasTime) {
      const timeout = setTimeout(() => {
        dispatch({ type: 'SET_BIAS_INPUT_DISABLED', payload: false });
      }, BIAS_COOLDOWN_MS);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [state.lastBiasTime]);

  useEffect(() => {
    if (state.isGeneratorStarted) {
      fetchGridData();
      generationIntervalRef.current = window.setInterval(fetchGridData, GENERATION_STEP_MS);
    } else {

    }

    return () => {
      cleanupGenerationRef()
    };
  }, [state.isGeneratorStarted, state.biasChar]);

  const cleanupGenerationRef = () => {
    if (generationIntervalRef.current) {
      clearInterval(generationIntervalRef.current);
      generationIntervalRef.current = null;
    }
  }

  const fetchGridData = async () => {
    try {
      const { grid, lastBiasTime, prevBiasChar } = await generateGrid({
        bias: state.biasChar,
      });
      const { code } = await getGridCode();

      if (
        state.biasChar !== prevBiasChar &&
        !state.isBiasInputDisabled &&
        lastBiasTime + BIAS_COOLDOWN_MS > Date.now()
      ) {
        dispatch({ type: 'SET_LAST_BIAS_TIME', payload: lastBiasTime });
        dispatch({ type: 'SET_BIAS_INPUT_DISABLED', payload: true });
      }

      dispatch({ type: 'SET_GRID_DATA', payload: { grid, code } });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="main-page">
      <div className="main-content">
        <h1>Altar.io Full-Stack Exercise 1223</h1>
        <Navbar />
        <Routes>
          <Route path="/" element={<GeneratorView
            state={state}
            dispatch={dispatch}
          />}
          >

          </Route>
          <Route path="/payments" element={<PaymentView
            state={state}
            dispatch={dispatch}
          />}>

          </Route>
        </Routes>

      </div>
    </div >
  );
}

export default App;
