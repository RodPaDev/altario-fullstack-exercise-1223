import { useEffect, useRef, useState } from 'react'
import { generateGrid, getGridCode } from '../../api/grid'
import clsx from "clsx";

import Grid from '../../components/Grid'
import Input from '../../components/Input'
import Button from '../../components/Button'
import ClockComponent from '../../components/Clock'

import './generator.css'

const GENERATION_STEP_MS = 2000
const BIAS_COOLDOWN_MS = 4000;

export type GridData = {
  grid: string
  code: string
}

type GeneratorViewProps = {
  isConnected: boolean,
  gridData: GridData | null,
  setGridData: Function
}

export default function GeneratorView({ isConnected, gridData, setGridData }: GeneratorViewProps) {
  const [biasChar, setBiasChar] = useState<string>("")
  const [isGeneratorStarted, setIsGeneratorStarted] = useState<boolean>(false)
  const [lastBiasTime, setLastBiasTime] = useState<number | null>(null)
  const [isBiasInputDisabled, setIsBiasInputDisabled] = useState<boolean>(false)

  let generationIntervalRef = useRef<number | null>(null);


  const onHandleBiasChar = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "" || /^[a-zA-Z]$/.test(e.target.value)) {
      setBiasChar(e.target.value)
    }
  }

  useEffect(() => {
    const startGeneration = async () => {
      await fetchGridData();

      generationIntervalRef.current = setInterval(() => {
        fetchGridData();
      }, GENERATION_STEP_MS);
    };

    if (isGeneratorStarted) {
      startGeneration();
    }

    return () => {
      if (generationIntervalRef.current) {
        clearInterval(generationIntervalRef.current)
        generationIntervalRef.current = null
      }
    }

  }, [isGeneratorStarted, isBiasInputDisabled, biasChar])

  useEffect(() => {
    if (lastBiasTime) {
      const timeout = setTimeout(() => {
        setIsBiasInputDisabled(false)
      }, BIAS_COOLDOWN_MS);

      return () => {
        clearTimeout(timeout)
      };
    }
  }, [lastBiasTime]);

  function handleGenerateGrid() {
    setIsGeneratorStarted(s => !s)
  }

  async function fetchGridData() {
    try {
      const { grid, lastBiasTime, prevBiasChar } = await generateGrid({ bias: biasChar });
      const { code } = await getGridCode()
      if (biasChar !== prevBiasChar && !isBiasInputDisabled && lastBiasTime + BIAS_COOLDOWN_MS > Date.now()) {
        setLastBiasTime(lastBiasTime);
        setIsBiasInputDisabled(true);
      }

      setGridData({ grid, code })
    } catch (error) {
      console.error(error);
    }
  }

  function getGridStatus() {
    if (!isConnected) {
      return {
        status: "DISCONNECTED",
        indicatorType: "disconnected",
        message: "VERIFY IF BACKEND IS UP AND RUNNING",
      };
    }

    if (isGeneratorStarted && gridData?.code) {
      return {
        status: "LIVE",
        indicatorType: "live",
        message: `YOUR CODE: ${gridData.code}`

      };
    }

    return {
      status: "READY",
      indicatorType: "ready",
      message: "READY FOR GRID GENERATION",
    };
  }

  const { status, indicatorType, message } = getGridStatus();

  return (
    <div>
      <div className='action-bar'>
        <Input
          disabled={isBiasInputDisabled}
          placeholder='Character'
          label='Character'
          onChange={onHandleBiasChar}
          value={biasChar} />
        <ClockComponent />
        <Button label={isGeneratorStarted ? 'HALT GENERATION' : 'GENERATE 2D GRID'} onClick={handleGenerateGrid} />
      </div>
      <Grid data={gridData?.grid} />
      <div className="grid-status-container">
        <div className="grid-status-indicator-container">
          <div className={clsx('grid-status-indicator', indicatorType)}></div>
          <span>{status}</span>
        </div>
        <div className="grid-status-code-container">
          <span>{message}</span>
        </div>
      </div>
    </div>

  )
}


