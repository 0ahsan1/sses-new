import React from "react";

export default function ResultsSection({ results }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
      <h2 className="text-lg font-bold text-gray-900 mb-4">
        Calculation Results
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        <ResultCard
          label="System Size"
          value={`${results.systemSizeKW} kW`}
        />

        <ResultCard
          label="Yearly Units Saved"
          value={`${results.yearlyUnitsGenerated.toLocaleString()} units`}
        />

        <ResultCard
          label="Monthly Units Saved"
          value={`${results.monthlyUnitsGenerated.toLocaleString()} units`}
        />

        <ResultCard
          label="Yearly Savings"
          value={`₨${results.yearlySavings.toLocaleString()}`}
        />

        <ResultCard
          label="Monthly Savings"
          value={`₨${results.monthlySavings.toLocaleString()}`}
        />

        <ResultCard
          label="CO₂ Reduction / Year"
          value={`${results.co2ReductionYearly.toLocaleString()} kg`}
        />
      </div>
    </div>
  );
}

function ResultCard({ label, value }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
        {label}
      </p>

      <p className="text-xl font-bold text-gray-900 mt-1">
        {value}
      </p>
    </div>
  );
}