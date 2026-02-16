import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, BarChart3, Leaf, Users } from "lucide-react";
import Image from "next/image";
import {strapiImageLoader} from "@/services/ApiService";

const features = [
	{
		icon: TrendingUp,
		title: "Increase Traffic",
		description: "We analyze your business goal, target audience, and market trends.",
	},
	{
		icon: BarChart3,
		title: "Improve Ranking",
		description: "We analyze your business goal, target audience, and market trends.",
	},
	{
		icon: Leaf,
		title: "Sustainable Growth",
		description: "We analyze your business goal, target audience, and market trends.",
	},
	{
		icon: Users,
		title: "Targeted Audience",
		description: "We analyze your business goal, target audience, and market trends.",
	},
];

export default function Feature({data}) {
	return (
		<section className="bg-[#edf7ed] py-20 lg:py-24">
			<div className="max-w-7xl mx-auto px-6">
				<div className="grid lg:grid-cols-2 gap-8 mb-14">
					<div>
						<motion.h2
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-gray-900 leading-tight"
						>
							{data?.title}
						</motion.h2>
					</div>
					<div
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						className="text-gray-600 leading-relaxed self-end"
						dangerouslySetInnerHTML={{__html:data.description}}
					>
					</div>
				</div>
				
				<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
					{data.items.map((feature, i) => (
						<motion.div
							key={feature.title}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: i * 0.1 }}
							className="group"
						>
							<div className="w-14 h-14 rounded-xl bg-white/80 flex items-center justify-center mb-5 group-hover:bg-[#fc6e0b]/10 transition-colors duration-300">
								<Image src={feature?.image.url} width={40} height={40} loader={strapiImageLoader} />
							</div>
							<h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
							<p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}