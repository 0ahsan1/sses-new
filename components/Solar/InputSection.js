import React from "react";

export default function InputSection({ inputs, updateInput }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
      <h2 className="text-lg font-bold text-gray-900 mb-4">
        Solar System Details
      </h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Solar System Size (kW)
        </label>

        <input
          type="number"
          min="0"
          step="0.1"
          value={inputs.systemSizeKW}
          onChange={(e) => updateInput("systemSizeKW", e.target.value)}
          placeholder="Example: 1, 2, 3, 5"
          className="w-full h-11 rounded-xl border border-gray-200 px-4 text-sm outline-none focus:ring-2 focus:ring-gray-300"
        />
      </div>
    </div>
  );
}