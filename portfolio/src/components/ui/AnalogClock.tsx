import { useEffect, useState, useRef } from 'react';
import './AnalogClock.css';

interface ClockTime {
    hours: number;
    minutes: number;
    seconds: number;
}

/**
 * Analog Clock Component
 * Automatically uses the visitor's local timezone
 * Based on classic CSS analog clock design
 */
const AnalogClock = () => {
    const [time, setTime] = useState<ClockTime>({ hours: 0, minutes: 0, seconds: 0 });
    const [timezone, setTimezone] = useState<string>('');
    const clockRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Get user's timezone
        const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        setTimezone(userTimezone.split('/').pop()?.replace(/_/g, ' ') || 'Local');

        const updateTime = () => {
            const now = new Date();
            setTime({
                hours: now.getHours(),
                minutes: now.getMinutes(),
                seconds: now.getSeconds()
            });
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);

        return () => clearInterval(interval);
    }, []);

    // Calculate rotation angles
    const secondsDeg = (time.seconds / 60) * 360;
    const minutesDeg = ((time.minutes + time.seconds / 60) / 60) * 360;
    const hoursDeg = ((time.hours % 12 + time.minutes / 60) / 12) * 360;

    // Format digital time
    const formatTime = (num: number) => num.toString().padStart(2, '0');

    return (
        <div className="analog-clock-wrapper">
            <div className="analog-clock" ref={clockRef}>
                {/* Clock face markings */}
                <div className="clock-face">
                    {/* Hour markers */}
                    {[...Array(12)].map((_, i) => (
                        <div
                            key={i}
                            className="hour-marker"
                            style={{ transform: `rotate(${i * 30}deg)` }}
                        >
                            <div className="marker-line" />
                        </div>
                    ))}

                    {/* Minute markers */}
                    {[...Array(60)].map((_, i) => (
                        i % 5 !== 0 && (
                            <div
                                key={`min-${i}`}
                                className="minute-marker"
                                style={{ transform: `rotate(${i * 6}deg)` }}
                            >
                                <div className="marker-dot" />
                            </div>
                        )
                    ))}
                </div>

                {/* Clock hands */}
                <div
                    className="hand hour-hand"
                    style={{ transform: `rotate(${hoursDeg}deg)` }}
                />
                <div
                    className="hand minute-hand"
                    style={{ transform: `rotate(${minutesDeg}deg)` }}
                />
                <div
                    className="hand second-hand"
                    style={{ transform: `rotate(${secondsDeg}deg)` }}
                />

                {/* Center dot */}
                <div className="center-dot" />
            </div>

            {/* Digital time display */}
            <div className="digital-time">
                <span className="time-text">
                    {formatTime(time.hours)}:{formatTime(time.minutes)}:{formatTime(time.seconds)}
                </span>
                <span className="timezone-text">{timezone}</span>
            </div>
        </div>
    );
};

export default AnalogClock;
