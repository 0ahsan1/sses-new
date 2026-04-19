import { useState, useCallback } from "react";

const LOCATION_IRRADIANCE = {
	Karachi: 1600,
	Lahore: 1550,
	Islamabad: 1650,
	Peshawar: 1580,
	Quetta: 1620,
	Multan: 1570,
	Faisalabad: 1560,
	Hyderabad: 1590,
	Rawalpindi: 1600,
	Gujranwala: 1550,
};

const ORIENTATION_FACTORS = { South: 1, East: 0.95, West: 0.95, North: 0.85 };
const SQFT_TO_SQM = 0.0929;
const PANEL_WATT = 450;
const PANEL_EFFICIENCY = 0.2;
const DERATE = 0.85;
const PERFORMANCE_RATIO = 0.8;
const DEFAULT_COST_PER_KW = 150000;
const PACK_DENSITY = 200; // W per sqm
const CO2_PER_KWH = 0.7;
const DEFAULT_TARIFF = 62;

export const LOCATIONS = Object.keys(LOCATION_IRRADIANCE);
export const ORIENTATIONS = ["South", "East", "West", "North"];

const defaultInputs = {
	bill: 50000,
	tariff: DEFAULT_TARIFF,
	costPerKW: 0,
	location: "Karachi",
	areaSqFt: 999,
	tilt: 30,
	orientation: "South",
	shading: 0,
};

export default function useCalculator() {
	const [inputs, setInputs] = useState(defaultInputs);
	const [results, setResults] = useState(null);
	const [calculatedAt, setCalculatedAt] = useState(null);
	
	const updateInput = useCallback((key, value) => {
		setInputs((prev) => ({ ...prev, [key]: value }));
	}, []);
	
	const resetForm = useCallback(() => {
		setInputs(defaultInputs);
		setResults(null);
		setCalculatedAt(null);
	}, []);
	
	const calculate = useCallback(() => {
		const { bill, tariff, costPerKW, location, areaSqFt, tilt, orientation, shading } = inputs;
		const t = tariff || DEFAULT_TARIFF;
		const cpk = costPerKW || DEFAULT_COST_PER_KW;
		const useEstimatedCost = !costPerKW || costPerKW === 0;
		
		const areaSqM = areaSqFt * SQFT_TO_SQM;
		const irradiance = LOCATION_IRRADIANCE[location] || 1600;
		const orientationFactor = ORIENTATION_FACTORS[orientation] || 1;
		const tiltFactor = tilt >= 10 && tilt <= 30 ? 1 : 0.95;
		const shadingFactor = 1 - shading / 100;
		const adjustedEfficiency = PANEL_EFFICIENCY * shadingFactor;
		
		// Max system from roof
		const maxRoofKW = (areaSqM * PACK_DENSITY) / 1000;
		
		// System size from bill
		const monthlyKwh = bill / t;
		const annualKwh = monthlyKwh * 12;
		const billBasedKW =
			annualKwh /
			(irradiance * adjustedEfficiency * DERATE * PERFORMANCE_RATIO * orientationFactor * tiltFactor);
		
		// Cap at 80% bill offset if roof constrains
		const systemSize = Math.min(billBasedKW, maxRoofKW);
		const roofConstrained = systemSize < billBasedKW;
		
		const annualGeneration =
			systemSize *
			irradiance *
			adjustedEfficiency *
			DERATE *
			PERFORMANCE_RATIO *
			orientationFactor *
			tiltFactor;
		
		const billOffset = (annualGeneration / annualKwh) * 100;
		const monthlySavings = (annualGeneration * t) / 12;
		const yearlySavings = annualGeneration * t;
		const systemCost = systemSize * cpk;
		const paybackPeriod = systemCost / yearlySavings;
		const co2Avoided = annualGeneration * CO2_PER_KWH;
		
		const now = new Date().toISOString();
		setCalculatedAt(now);
		
		setResults({
			systemSize,
			systemCost,
			annualGeneration,
			panelEfficiency: adjustedEfficiency,
			billOffset: Math.min(billOffset, 100),
			monthlySavings: Math.min(monthlySavings, bill),
			yearlySavings: Math.min(yearlySavings, bill * 12),
			paybackPeriod,
			co2Avoided,
			useEstimatedCost,
		});
	}, [inputs]);
	
	const downloadJSON = useCallback(() => {
		if (!results) return;
		const data = {
			inputs: { ...inputs, areaSqM: inputs.areaSqFt * SQFT_TO_SQM },
			results,
			assumptions: {
				locationIrradiance: LOCATION_IRRADIANCE,
				panelWatt: PANEL_WATT,
				panelEfficiency: PANEL_EFFICIENCY,
				derate: DERATE,
				performanceRatio: PERFORMANCE_RATIO,
				defaultCostPerKW: DEFAULT_COST_PER_KW,
				orientationFactors: ORIENTATION_FACTORS,
				tiltFactors: { optimal: { min: 10, max: 30, factor: 1 }, suboptimal: { factor: 0.95 } },
				packDensity: PACK_DENSITY,
				co2PerKwh: CO2_PER_KWH,
				sqftToSqm: SQFT_TO_SQM,
				tariff: inputs.tariff || DEFAULT_TARIFF,
				costPerKW: inputs.costPerKW || DEFAULT_COST_PER_KW,
				calculatedEfficiency: PANEL_EFFICIENCY * (1 - inputs.shading / 100),
			},
			calculatedAt,
		};
		const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `solar-calculation-${Date.now()}.json`;
		a.click();
		URL.revokeObjectURL(url);
	}, [results, inputs, calculatedAt]);
	
	return { inputs, updateInput, results, calculate, resetForm, downloadJSON };
}