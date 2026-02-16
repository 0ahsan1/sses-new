import React from "react";
import { motion } from "framer-motion";
import { Zap, Home, Leaf, Award } from "lucide-react";

const stats = [
	{ icon: Zap, value: "15MW+", label: "Energy Generated", color: "text-amber-400" },
	{ icon: Home, value: "2,500+", label: "Homes Powered", color: "text-blue-400" },
	{ icon: Leaf, value: "8,000t", label: "CO₂ Reduced", color: "text-emerald-400" },
	{ icon: Award, value: "12 Yrs", label: "Industry Experience", color: "text-purple-400" },
];

export default function StatsSection() {
	return (
		<section id="stats" className="relative py-24 bg-white">
			<div className="max-w-7xl mx-auto px-6 lg:px-8">
				<div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
					{stats.map((stat, i) => (
						<motion.div
							key={stat.label}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: i * 0.1 }}
							className="text-center group"
						>
							<div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-50 group-hover:bg-slate-100 transition-colors mb-5">
								<stat.icon className={`w-7 h-7 ${stat.color}`} />
							</div>
							<p className="text-4xl font-bold text-slate-900 tracking-tight">{stat.value}</p>
							<p className="text-slate-500 mt-2 text-sm font-medium tracking-wide uppercase">{stat.label}</p>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}