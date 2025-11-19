import { useState, useEffect } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerProps {
  targetDate: Date;
  compact?: boolean;
}

export function CountdownTimer({ targetDate, compact = false }: CountdownTimerProps) {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +targetDate - +new Date();
    
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
    
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (compact) {
    return (
      <div className="text-white text-base sm:text-lg md:text-xl tracking-wider">
        {timeLeft.days}D {timeLeft.hours}H {timeLeft.minutes}M {timeLeft.seconds}S
      </div>
    );
  }

  const units = [
    { value: timeLeft.days, label: 'Days' },
    { value: timeLeft.hours, label: 'Hours' },
    { value: timeLeft.minutes, label: 'Minutes' },
    { value: timeLeft.seconds, label: 'Seconds' }
  ];

  return (
    <div className="flex gap-4 sm:gap-6 md:gap-8 justify-center">
      {units.map((unit, index) => (
        <div key={unit.label} className="text-center">
          <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-2">{unit.value}</div>
          <div className="text-xs sm:text-sm uppercase tracking-widest text-gray-600">{unit.label}</div>
        </div>
      ))}
    </div>
  );
}