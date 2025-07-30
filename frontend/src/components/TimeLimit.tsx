import React from "react";

interface TimeLimitInputProps {
  value: number;
  onChange: (value: number) => void;
}

export default function TimeLimitInput({ value, onChange }: TimeLimitInputProps) {
  // Helper to clamp values
  const clamp = (val: number, min: number, max: number) => Math.max(min, Math.min(max, val));

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Time Limit: {Math.floor(value / 3600)}h{" "}
        {Math.floor((value % 3600) / 60)}m{" "}
        {value % 60}s
      </label>

      {/* Seconds Input */}
      <div className="mb-3">
        <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
          Total Seconds:
        </label>
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value) || 0)}
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter total seconds"
        />
      </div>

      {/* Hour/Minute/Second Inputs */}
      <div className="mb-3 items-center">
        <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
          Or set by time:
        </label>
        <div className="flex gap-2 items-center justify-between">
          {/* Hours */}
          <div className="flex-1">
            <input
              type="number"
              value={Math.floor(value / 3600)}
              onChange={(e) => {
                const hours = parseInt(e.target.value) || 0;
                const minutes = Math.floor((value % 3600) / 60);
                const seconds = value % 60;
                onChange(Math.max(1, hours * 3600 + minutes * 60 + seconds));
              }}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
            />
            <div className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1">
              Hours
            </div>
          </div>
          {/* Minutes */}
          <div className="flex-1">
            <input
              type="number"
              min="0"
              max="59"
              value={Math.floor((value % 3600) / 60)}
              onChange={(e) => {
                const hours = Math.floor(value / 3600);
                const minutes = clamp(parseInt(e.target.value) || 0, 0, 59);
                const seconds = value % 60;
                onChange(Math.max(1, hours * 3600 + minutes * 60 + seconds));
              }}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
            />
            <div className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1">
              Minutes
            </div>
          </div>
          {/* Seconds */}
          <div className="flex-1">
            <input
              type="number"
              min="0"
              max="59"
              value={value % 60}
              onChange={(e) => {
                const hours = Math.floor(value / 3600);
                const minutes = Math.floor((value % 3600) / 60);
                const seconds = clamp(parseInt(e.target.value) || 0, 0, 59);
                onChange(Math.max(1, hours * 3600 + minutes * 60 + seconds));
              }}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
            />
            <div className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1">
              Seconds
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}