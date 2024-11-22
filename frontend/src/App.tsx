import { useEffect, useRef, useState } from 'react';
import './App.css';
import GeneratorView, { GridData } from './views/Generator';
import PaymentView from './views/Payment';
import { getPing } from './api/ping';

const PING_INTERVAL_MS = 5000

function App() {
  const [gridData, setGridData] = useState<GridData | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const pingRef = useRef<number | null>(null);

  const handleGridDataUpdate = (gridData: GridData) => {
    setGridData(gridData);
  };

  useEffect(() => {
    const checkPingStatus = async () => {
      const ping = await getPing();
      setIsConnected(ping);
    }

    checkPingStatus()

    pingRef.current = setInterval(checkPingStatus, PING_INTERVAL_MS);

    return () => {
      if (pingRef.current) {
        clearInterval(pingRef.current);
      }
    };

  }, []);

  return (
    <div className="main-page">
      <div className="main-content">
        <h1>Altar.io Full-Stack Exercise 1223</h1>
        <GeneratorView isConnected={isConnected} gridData={gridData} setGridData={handleGridDataUpdate} />
        <PaymentView gridData={gridData} />
      </div>
    </div>
  );
}

export default App;
