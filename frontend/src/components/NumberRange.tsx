import React from "react";

interface NumberRangeInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export default function NumberRangeInput({
  value,
  onChange,
  min = 1,
  max = 1000,
}: NumberRangeInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Number Range: 1 - {value}
        </label>
        <input
          type="number"
          min={min}
          max={max}
          value={value}
          onChange={(e) => {
            let val = parseInt(e.target.value);
            if (isNaN(val) || val < min) val = min;
            if (val > max) val = max;
            onChange(val);
          }}
          className="w-24 p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
        />
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full"
      />
      <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
        Players will see numbers from 1 to {value}
      </div>
    </div>
  );
}
