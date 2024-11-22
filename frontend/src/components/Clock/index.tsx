import { useEffect, useState } from 'react';
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';

function ClockComponent() {
    const [time, setTime] = useState<Date>(new Date());

    useEffect(() => {
        const interval = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    return <Clock value={time} size={50} renderMinuteMarks={false} renderMinuteHand={false} renderHourMarks={false} />;
}

export default ClockComponent;
