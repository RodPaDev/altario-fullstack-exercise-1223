import clsx from 'clsx';
import { State } from '../../state';

import "./generatorStatus.css"

type GridStatusProps = {
    state: State;
};

export default function GeneratorStatus({ state }: GridStatusProps) {
    const getStatus = () => {
        if (!state.isConnected) {
            return {
                status: 'DISCONNECTED',
                indicatorType: 'disconnected',
                message: 'VERIFY IF BACKEND IS UP AND RUNNING',
            };
        }

        if (state.isGeneratorStarted && state.gridData?.code) {
            return {
                status: 'LIVE',
                indicatorType: 'live',
                message: <span>YOUR CODE: <strong>{state.gridData.code}</strong></span>,
            };
        }

        return {
            status: 'READY',
            indicatorType: 'ready',
            message: 'READY FOR GRID GENERATION',
        };
    };

    const { status, indicatorType, message } = getStatus();

    return (
        <div className="generator-status-container">
            <div className="generator-status-indicator-container">
                <div className={clsx('generator-status-indicator', indicatorType)}></div>
                <span>{status}</span>
            </div>
            <div className="generator-status-code-container">
                <span>{message}</span>
            </div>
        </div>
    );
}
