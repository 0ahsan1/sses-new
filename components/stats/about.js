import React from "react";
import { motion } from "framer-motion";
import {Rocket, Heart, Clock, Users, Sun, Server, Shield} from "lucide-react";

const stats = [
	{
		label: "Solar Capacity Installed",
		value: "500MW+",
		icon: Sun, // or Zap
		description: "Powering sustainable data centers with clean solar energy infrastructure.",
		color: "text-[#fc6e0b]",
	},
	{
		label: "Data Centers Powered",
		value: "50+",
		icon: Server, // or HardDrive
		description: "Reliable solar-powered server facilities across multiple regions.",
		color: "text-[#fc6e0b]",
	},
	{
		label: "Years in Solar Infrastructure",
		value: "15+",
		icon: Clock, // or Award
		description: "Pioneering sustainable digital infrastructure solutions for over a decade.",
		color: "text-[#fc6e0b]",
	},
	{
		label: "Uptime Guaranteed",
		value: "99.9%",
		icon: Shield, // or CheckCircle
		description: "Unmatched reliability with solar-redundant power systems.",
		color: "text-[#fc6e0b]",
	},
];

export default function AboutStats() {
	return (
		<section className="bg-white py-20 lg:py-24">
			<div className="max-w-7xl mx-auto px-6">
				<div className="grid lg:grid-cols-2 gap-8 mb-12">
					<div>
						<motion.div
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							viewport={{ once: true }}
							className="flex items-center gap-2 mb-3"
						>
							<div className="w-2.5 h-2.5 rounded-full bg-[#fc6e0b]" />
							<span className="text-sm font-semibold text-[#fc6e0b]">About Us</span>
						</motion.div>
						<motion.h2
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-gray-900 leading-tight"
						>
							We Strive To Innovative
						</motion.h2>
					</div>
					<motion.p
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						className="text-gray-600 leading-relaxed self-end"
					>
						Solar-powered infrastructure combined with cutting-edge server technology delivers sustainable, high-performance computing solutions for the digital future.					</motion.p>
				</div>
				
				<div className="border-t border-gray-200 pt-12">
					<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
						{stats.map((stat, i) => (
							<motion.div
								key={stat.label}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: i * 0.1 }}
							>
								<p className="text-xs text-gray-400 font-medium mb-3">/ {stat.label}</p>
								<div className="flex items-center gap-3 mb-3">
									<span className="text-4xl md:text-5xl font-bold text-gray-900">{stat.value}</span>
									<stat.icon className={`w-6 h-6 ${stat.color}`} />
								</div>
								<p className="text-sm text-gray-500 leading-relaxed">{stat.description}</p>
							</motion.div>
						))}
					</div>
				</div>
				
				<div className="border-t border-gray-200 mt-12" />
			</div>
		</section>
	);
}