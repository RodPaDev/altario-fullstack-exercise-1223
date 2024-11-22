import { Fragment, useEffect, useRef, useState } from 'react'
import { generateGrid, getGridCode } from '../../api/grid'
import clsx from "clsx";

import Grid from '../../components/Grid'
import Input from '../../components/Input'
import Button from '../../components/Button'
import ClockComponent from '../../components/Clock'

import './generator.css'

const GENERATION_STEP_MS = 2000
const BIAS_COOLDOWN_MS = 4000;

type GridData = {
  grid: string
  code: string
}

export default function GeneratorView() {
  const [biasChar, setBiasChar] = useState<string>("")
  const [isGeneratorStarted, setIsGeneratorStarted] = useState<boolean>(false)
  const [apiData, setApiData] = useState<GridData | null>(null)
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

      setApiData({ grid, code })
    } catch (error) {
      console.error(error);
    }
  }

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
      <Grid data={apiData?.grid} />
      <div className='grid-status-container'>
        <div className='grid-status-indicator-container'>
          <div className={clsx('grid-status-indicator', isGeneratorStarted && 'live')}></div>
          <span>{isGeneratorStarted ? 'LIVE' : 'OFFLINE'}</span>
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

  )
}


