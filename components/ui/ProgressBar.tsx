
import React from 'react';

interface ProgressBarProps {
  progress: number; // A number between 0 and 100
  className?: string;
  fillColor?: string;
  backgroundColor?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  className = '',
  fillColor = 'bg-[#FF6B00]',
  backgroundColor = 'bg-gray-200',
}) => {
  const clampedProgress = Math.max(0, Math.min(100, progress));

  return (
    <div className={`w-full h-2 rounded-full overflow-hidden ${backgroundColor} ${className}`}>
      <div
        className={`h-full rounded-full transition-all duration-300 ease-out ${fillColor}`}
        style={{ width: `${clampedProgress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
