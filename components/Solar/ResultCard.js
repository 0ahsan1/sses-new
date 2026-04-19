import React from "react";
import { motion } from "framer-motion";

export default function ResultCard({ label, value, unit, description, color = "teal", icon: Icon, delay = 0 }) {
	const colorMap = {
		teal: "from-teal-50 to-emerald-50 border-teal-200",
		blue: "from-blue-50 to-cyan-50 border-blue-200",
		amber: "from-amber-50 to-yellow-50 border-amber-200",
		purple: "from-purple-50 to-violet-50 border-purple-200",
		green: "from-green-50 to-emerald-50 border-green-200",
		rose: "from-rose-50 to-pink-50 border-rose-200",
	};
	
	const textColorMap = {
		teal: "text-teal-700",
		blue: "text-blue-700",
		amber: "text-amber-700",
		purple: "text-purple-700",
		green: "text-green-700",
		rose: "text-rose-700",
	};
	
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4, delay }}
			className={`bg-gradient-to-br ${colorMap[color]} border rounded-2xl p-5 flex flex-col items-center text-center`}
		>
			{Icon && (
				<div className={`mb-2 ${textColorMap[color]} opacity-60`}>
					<Icon className="w-5 h-5" />
				</div>
			)}
			<p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">{label}</p>
			<p className={`text-2xl font-bold ${textColorMap[color]}`}>
				{value}
				{unit && <span className="text-sm font-medium ml-1">{unit}</span>}
			</p>
			<p className="text-[11px] text-gray-400 mt-1.5 leading-tight">{description}</p>
		</motion.div>
	);
}