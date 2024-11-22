import { useEffect, useRef, useReducer } from 'react';
import './App.css';
import GeneratorView from './views/Generator';
import PaymentView from './views/Payment';
import { getPing } from './api/ping';
import { generateGrid, getGridCode } from './api/grid';
import { initialState, reducer, State } from './state';

const PING_INTERVAL_MS = 5000;
const GENERATION_STEP_MS = 2000;

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

  const startGridGeneration = async () => {
    dispatch({ type: 'TOGGLE_GENERATOR' });
    await fetchGridData();

    generationIntervalRef.current = setInterval(() => {
      fetchGridData();
    }, GENERATION_STEP_MS);
  };

  const stopGridGeneration = () => {
    dispatch({ type: 'TOGGLE_GENERATOR' });
    if (generationIntervalRef.current) {
      clearInterval(generationIntervalRef.current);
      generationIntervalRef.current = null;
    }
  };

  const fetchGridData = async () => {
    try {
      const { grid, lastBiasTime, prevBiasChar } = await generateGrid({
        bias: state.biasChar,
      });
      const { code } = await getGridCode();

      if (
        state.biasChar !== prevBiasChar &&
        !state.isBiasInputDisabled &&
        lastBiasTime + 4000 > Date.now()
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
        <GeneratorView
          state={state}
          dispatch={dispatch}
          startGridGeneration={startGridGeneration}
          stopGridGeneration={stopGridGeneration}
        />
        <PaymentView gridData={state.gridData} />
      </div>
    </div>
  );
}

export default App;
