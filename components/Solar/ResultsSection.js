import React from "react";
import { motion } from "framer-motion";
import ResultCard from "./ResultCard";
import {
	Zap,
	DollarSign,
	Sun,
	Gauge,
	Percent,
	PiggyBank,
	TrendingUp,
	Clock,
	Leaf,
} from "lucide-react";

export default function ResultsSection({ results }) {
	if (!results) return null;
	
	const fmt = (n, d = 2) => Number(n).toLocaleString("en-PK", { minimumFractionDigits: d, maximumFractionDigits: d });
	
	const cards = [
		{
			label: "System Size",
			value: fmt(results.systemSize),
			unit: "kW",
			description: "Recommended solar system capacity",
			color: "teal",
			icon: Zap,
		},
		{
			label: "System Cost",
			value: `₨${fmt(results.systemCost, 0)}`,
			description: results.useEstimatedCost ? "Estimated total system cost (calculated)" : "Total system cost",
			color: "blue",
			icon: DollarSign,
		},
		{
			label: "Annual Generation",
			value: fmt(results.annualGeneration),
			unit: "kWh",
			description: "Estimated electricity production",
			color: "amber",
			icon: Sun,
		},
		{
			label: "Panel Efficiency",
			value: `${(results.panelEfficiency * 100).toFixed(0)}%`,
			description: "Adjusted for shading conditions",
			color: "purple",
			icon: Gauge,
		},
		{
			label: "Bill Offset",
			value: `${fmt(results.billOffset)}%`,
			description: "Percentage of bill covered by solar",
			color: "green",
			icon: Percent,
		},
		{
			label: "Monthly Savings",
			value: `₨${fmt(results.monthlySavings)}`,
			description: "Estimated monthly savings",
			color: "teal",
			icon: PiggyBank,
		},
		{
			label: "Yearly Savings",
			value: `₨${fmt(results.yearlySavings)}`,
			description: "Estimated annual savings",
			color: "blue",
			icon: TrendingUp,
		},
		{
			label: "Payback Period",
			value: fmt(results.paybackPeriod),
			unit: "years",
			description: "Time to recover your investment",
			color: "amber",
			icon: Clock,
		},
		{
			label: "CO₂ Avoided",
			value: fmt(results.co2Avoided),
			unit: "kg",
			description: "Annual carbon emissions reduction",
			color: "green",
			icon: Leaf,
		},
	];
	
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.3 }}
		>
			<div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
				<h2 className="text-lg font-bold text-gray-800 tracking-tight mb-5">Calculation Results</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
					{cards.map((card, i) => (
						<ResultCard key={card.label} {...card} delay={i * 0.06} />
					))}
				</div>
			</div>
		</motion.div>
	);
}