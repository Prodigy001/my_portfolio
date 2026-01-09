interface ProgressCircleProps {
  current: number;
  total: number;
  size?: number;
  strokeWidth?: number;
}

const ProgressCircle = ({
  current,
  total,
  size = 80,
  strokeWidth = 8,
}: ProgressCircleProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = (current / total) * 100;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex items-center justify-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          className="transform -rotate-90"
          style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.1))" }}
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#FFFFFF"
            strokeWidth={strokeWidth}
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#299BFF"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{
              transition: "stroke-dashoffset 0.35s ease",
            }}
          />
        </svg>
        {/* Text in center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold text-[#1A1A1A]">
            {current}/{total}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProgressCircle;
