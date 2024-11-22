import clsx from 'clsx';
import "./generatorStatus.css"

type GridStatusProps = {
    isConnected: boolean;
    isGeneratorStarted: boolean;
    gridCode: string | null;
};

export default function GridStatus({ isConnected, isGeneratorStarted, gridCode }: GridStatusProps) {
    const getStatus = () => {
        if (!isConnected) {
            return {
                status: 'DISCONNECTED',
                indicatorType: 'disconnected',
                message: 'VERIFY IF BACKEND IS UP AND RUNNING',
            };
        }

        if (isGeneratorStarted && gridCode) {
            return {
                status: 'LIVE',
                indicatorType: 'live',
                message: <span>YOUR CODE: <strong>{gridCode}</strong></span>,
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
