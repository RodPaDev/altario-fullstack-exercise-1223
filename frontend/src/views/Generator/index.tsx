import Grid from '../../components/Grid';
import Input from '../../components/Input';
import Button from '../../components/Button';
import ClockComponent from '../../components/Clock';
import GeneratorStatus from '../../components/GeneratorStatus';

import { State, Action } from '../../state';

import './generator.css';

type GeneratorViewProps = {
  state: State;
  dispatch: React.Dispatch<Action>;
  startGridGeneration: () => void;
  stopGridGeneration: () => void;
};

export default function GeneratorView({
  state,
  dispatch,
  startGridGeneration,
  stopGridGeneration,
}: GeneratorViewProps) {
  const handleBiasCharChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '' || /^[a-zA-Z]$/.test(e.target.value)) {
      dispatch({ type: 'SET_BIAS_CHAR', payload: e.target.value });
    }
  };

  const handleGenerateGrid = () => {
    if (state.isGeneratorStarted) {
      stopGridGeneration();
    } else {
      startGridGeneration();
    }
  };

  return (
    <div>
      <div className="action-bar">
        <Input
          disabled={state.isBiasInputDisabled}
          placeholder="Character"
          label="Character"
          onChange={handleBiasCharChange}
          value={state.biasChar}
        />
        <ClockComponent />
        <Button
          label={state.isGeneratorStarted ? 'HALT GENERATION' : 'GENERATE 2D GRID'}
          onClick={handleGenerateGrid}
        />
      </div>
      <Grid data={state.gridData?.grid} />
      <GeneratorStatus
        isConnected={state.isConnected}
        isGeneratorStarted={state.isGeneratorStarted}
        gridCode={state.gridData?.code || null}
      />
    </div>
  );
}
