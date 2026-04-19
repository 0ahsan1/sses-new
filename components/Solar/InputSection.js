import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import { LOCATIONS, ORIENTATIONS } from "./useCalculator";

function HelpTip({ text }) {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<HelpCircle className="w-3.5 h-3.5 text-gray-400 cursor-help inline ml-1" />
				</TooltipTrigger>
				<TooltipContent side="top" className="max-w-[220px] text-xs">
					{text}
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}

function NumberInput({ label, help, prefix, value, onChange, description }) {
	return (
		<div className="space-y-1.5">
			<Label className="text-sm font-semibold text-gray-700">
				{label}
				{help && <HelpTip text={help} />}
			</Label>
			<div className="relative">
				{prefix && (
					<span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400 font-medium">
            {prefix}
          </span>
				)}
				<Input
					type="number"
					value={value}
					onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
					className={`h-11 ${prefix ? "pl-10" : ""} bg-white border-gray-200 focus:border-teal-400 focus:ring-teal-400/20 rounded-xl`}
				/>
			</div>
			{description && <p className="text-[11px] text-gray-400">{description}</p>}
		</div>
	);
}

export default function InputSection({ inputs, updateInput }) {
	const adjustedEfficiency = (0.2 * (1 - inputs.shading / 100) * 100).toFixed(0);
	const useEstimatedCost = !inputs.costPerKW || inputs.costPerKW === 0;
	
	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
			{/* Left: Electricity Usage */}
			<div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
				<h2 className="text-lg font-bold text-gray-800 tracking-tight">Your Electricity Usage</h2>
				
				<NumberInput
					label="Monthly Electricity Bill (PKR)"
					help="Enter your average monthly electricity bill"
					prefix="₨"
					value={inputs.bill}
					onChange={(v) => updateInput("bill", v)}
					description="Enter amount in Pakistani Rupees"
				/>
				
				<NumberInput
					label="Electricity Cost (PKR/kWh)"
					help="Cost per unit of electricity"
					prefix="₨"
					value={inputs.tariff}
					onChange={(v) => updateInput("tariff", v)}
					description="Cost per unit in Pakistani Rupees"
				/>
				
				<div className="space-y-1.5">
					<NumberInput
						label="System Cost (PKR/kW)"
						help="Leave 0 for estimated cost (₨150,000/kW)"
						prefix="₨"
						value={inputs.costPerKW}
						onChange={(v) => updateInput("costPerKW", v)}
						description="Cost per kW of solar system installation"
					/>
					{useEstimatedCost && (
						<p className="text-[11px] text-teal-600 italic">Using estimated cost calculation</p>
					)}
				</div>
				
				<div className="space-y-1.5">
					<Label className="text-sm font-semibold text-gray-700">
						Location
						<HelpTip text="Select your city for accurate irradiance data" />
					</Label>
					<Select value={inputs.location} onValueChange={(v) => updateInput("location", v)}>
						<SelectTrigger className="h-11 bg-white border-gray-200 rounded-xl">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							{LOCATIONS.map((loc) => (
								<SelectItem key={loc} value={loc}>{loc}</SelectItem>
							))}
						</SelectContent>
					</Select>
					<p className="text-[11px] text-gray-400">Select your city for accurate results</p>
				</div>
			</div>
			
			{/* Right: Roof Specifications */}
			<div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
				<h2 className="text-lg font-bold text-gray-800 tracking-tight">Your Roof Specifications</h2>
				
				<NumberInput
					label="Usable Roof Area (sq ft)"
					help="Total usable roof area available for solar panels"
					value={inputs.areaSqFt}
					onChange={(v) => updateInput("areaSqFt", v)}
					description="Total usable area in square feet"
				/>
				
				<div className="space-y-1.5">
					<Label className="text-sm font-semibold text-gray-700">
						Roof Tilt (°)
						<HelpTip text="Angle of your roof. 10-30° is optimal." />
					</Label>
					<div className="flex items-center gap-4">
						<Slider
							value={[inputs.tilt]}
							onValueChange={([v]) => updateInput("tilt", v)}
							min={0}
							max={60}
							step={1}
							className="flex-1"
						/>
						<span className="text-sm font-semibold text-gray-600 w-8 text-right">{inputs.tilt}</span>
					</div>
					<p className="text-[11px] text-gray-400">Angle of your roof (0-60 degrees)</p>
				</div>
				
				<div className="space-y-1.5">
					<Label className="text-sm font-semibold text-gray-700">
						Roof Orientation
						<HelpTip text="Direction your roof faces. South is optimal." />
					</Label>
					<Select value={inputs.orientation} onValueChange={(v) => updateInput("orientation", v)}>
						<SelectTrigger className="h-11 bg-white border-gray-200 rounded-xl">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							{ORIENTATIONS.map((o) => (
								<SelectItem key={o} value={o}>{o}</SelectItem>
							))}
						</SelectContent>
					</Select>
					<p className="text-[11px] text-gray-400">Direction your roof faces</p>
				</div>
				
				<div className="space-y-1.5">
					<Label className="text-sm font-semibold text-gray-700">
						Shading (%)
						<HelpTip text="Percentage of your roof that is shaded (0-80%)" />
					</Label>
					<div className="flex items-center gap-4">
						<Slider
							value={[inputs.shading]}
							onValueChange={([v]) => updateInput("shading", v)}
							min={0}
							max={80}
							step={1}
							className="flex-1"
						/>
						<span className="text-sm font-semibold text-gray-600 w-8 text-right">{inputs.shading}</span>
					</div>
					<p className="text-[11px] text-gray-400">Percentage of roof area that is shaded (0-80%)</p>
				</div>
				
				<div className="text-center pt-2">
          <span className="text-sm font-bold text-teal-600">
            Panel Efficiency: {adjustedEfficiency}%
          </span>
				</div>
			</div>
		</div>
	);
}