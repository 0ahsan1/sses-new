import React from "react";
import { Button } from "@/components/ui/button";
import { Sun, Download, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";
import InputSection from "@/components/Solar/InputSection";
import ResultsSection from "@/components/Solar/ResultsSection";
import useCalculator from "@/components/Solar/useCalculator";

export function SolarCalculator() {
	const {
		inputs,
		updateInput,
		results,
		calculate,
		resetForm,
		downloadJSON,
	} = useCalculator();
	
	return (
		<div
			id="solarCalculator"
			className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50"
		>
			<div className="relative overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-emerald-600 opacity-[0.03]" />
				
				<div className="max-w-5xl mx-auto px-4 pt-10 pb-8 text-center">
					<motion.div
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className="flex items-center justify-center gap-3 mb-3"
					>
						<div className="w-10 h-10 bg-gradient-to-br from-gray-500 to-gray-500 rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/20">
							<Sun className="w-5 h-5 text-white" />
						</div>
						
						<h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
							Solar Savings Calculator
						</h1>
					</motion.div>
					
					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.2, duration: 0.5 }}
						className="text-gray-500 text-sm md:text-base"
					>
						Calculate monthly & yearly savings from solar energy
					</motion.p>
				</div>
			</div>
			
			<div className="max-w-5xl mx-auto px-4 pb-12 space-y-6 py-6">
				<InputSection inputs={inputs} updateInput={updateInput} />
				
				<div className="flex flex-wrap gap-3">
					<Button
						onClick={calculate}
						className="bg-gradient-to-r from-gray-500 to-gray-500 hover:from-gray-600 hover:to-gray-600 text-white font-semibold px-6 h-11 rounded-xl shadow-md shadow-teal-500/20 transition-all"
					>
						<Sun className="w-4 h-4 mr-2" />
						Calculate Savings
					</Button>
					
					{results && (
						<Button
							variant="outline"
							onClick={downloadJSON}
							className="h-11 rounded-xl border-gray-200 hover:bg-gray-50"
						>
							<Download className="w-4 h-4 mr-2" />
							Download Results (JSON)
						</Button>
					)}
					
					<Button
						variant="outline"
						onClick={resetForm}
						className="h-11 rounded-xl border-gray-200 hover:bg-gray-50"
					>
						<RotateCcw className="w-4 h-4 mr-2" />
						Reset Form
					</Button>
				</div>
				
				{results && <ResultsSection results={results} />}
				
				<div className="bg-white/60 rounded-2xl border border-gray-100 p-5 mt-4">
					<h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
						Calculation Assumptions
					</h3>
					
					<div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-2 text-[11px] text-gray-400">
						<p>1 kW Solar = 1450 units/year</p>
						<p>Electricity rate: ₨50/unit</p>
						<p>1 kW savings: ₨72,500/year</p>
						<p>2 kW savings: ₨145,000/year</p>
						<p>Monthly units = yearly units ÷ 12</p>
						<p>Monthly savings = yearly savings ÷ 12</p>
						<p>CO₂ reduction: 0.7 kg/kWh</p>
					</div>
					
					<p className="text-[10px] text-gray-400 mt-3">
						*Disclaimer: These values are estimates and actual results may vary
						based on specific conditions.
					</p>
				</div>
			</div>
		</div>
	);
}