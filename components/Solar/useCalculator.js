import { useState, useEffect } from "react";

export default function useCalculator() {
  const [inputs, setInputs] = useState({
    systemSizeKW: "2",
  });

  const [results, setResults] = useState(null);

  const updateInput = (field, value) => {
    setInputs((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const calculate = () => {
  const systemSizeKW = parseFloat(inputs.systemSizeKW);

  if (!systemSizeKW || systemSizeKW <= 0) {
    alert("Please enter a valid solar system size.");
    return;
  }

  setResults(calculateValues(systemSizeKW));
};
useEffect(() => {
  setResults(calculateValues(2));
}, []);
const calculateValues = (systemSizeKW) => {
  const UNITS_PER_KW_PER_YEAR = 1450;
  const ELECTRICITY_RATE = 50;
  const CO2_FACTOR = 0.7;

  const yearlyUnitsGenerated = systemSizeKW * UNITS_PER_KW_PER_YEAR;
  const monthlyUnitsGenerated = yearlyUnitsGenerated / 12;

  const yearlySavings = yearlyUnitsGenerated * ELECTRICITY_RATE;
  const monthlySavings = yearlySavings / 12;

  const co2ReductionYearly = yearlyUnitsGenerated * CO2_FACTOR;

  return {
    systemSizeKW,
    yearlyUnitsGenerated: Math.round(yearlyUnitsGenerated),
    monthlyUnitsGenerated: Math.round(monthlyUnitsGenerated),
    yearlySavings: Math.round(yearlySavings),
    monthlySavings: Math.round(monthlySavings),
    co2ReductionYearly: Math.round(co2ReductionYearly),
  };
};
  const resetForm = () => {
    setInputs({
      systemSizeKW: "",
    });

    setResults(null);
  };

  const downloadJSON = () => {
    if (!results) return;

    const dataStr = JSON.stringify(results, null, 2);

    const blob = new Blob([dataStr], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "solar-savings-results.json";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return {
    inputs,
    updateInput,
    results,
    calculate,
    resetForm,
    downloadJSON,
  };
}