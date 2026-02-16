import React from "react";
import { motion } from "framer-motion";
import { Lightbulb, Palette, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import {strapiImageLoader, strapiImagePath} from "@/services/ApiService";

const steps = [
	{
		icon: Lightbulb,
		title: "Best Implementation",
		desc: "We focus on delivering precise, high-quality implementations tailored to your business goals and growth strategy."
	},
	{
		icon: Palette,
		title: "Design Made for You",
		desc: "Custom designs crafted to reflect your brand identity, ensuring a seamless and engaging user experience."
	},
	{
		icon: CheckCircle2,
		title: "Finished the Process",
		desc: "From concept to launch, we ensure every project is completed with excellence and delivered on time."
	}
];

export default function LeftContent({data}) {
	return (
		<section className="py-10 px-6 bg-white">
			<div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
				<div>
					<motion.p
						initial={{ opacity: 0, y: 10 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="text-sm font-semibold tracking-[0.2em] uppercase mb-3"
						style={{ color: "#fc6e0b" }}
					>
						Our Work Process
					</motion.p>
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.1 }}
						className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 leading-tight"
					>
						{data?.title}
					</motion.h2>
					<div className={'max-w-xl'} dangerouslySetInnerHTML={{__html:data.description}}>
					
					</div>
					<div className="space-y-8">
						{data.items.map((step, i) => (
							<motion.div
								key={i}
								initial={{ opacity: 0, x: -20 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
								transition={{ delay: 0.15 * i }}
								className="flex gap-4"
							>
								<div
									className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
									style={{ backgroundColor: "#fc6e0b15" }}
								>
									<Image src={step?.image.url} width={40} height={40} loader={strapiImageLoader} />
								</div>
								<div>
									<h3 className="font-bold text-gray-900 text-lg mb-1">{step.title}</h3>
									<p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
								</div>
							</motion.div>
						))}
					</div>
				</div>
				
				<div className="relative">
					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true }}
						className=""
					>
						<Image src={data?.image[0].url} className={'w-full'} width={500} height={100} loader={strapiImageLoader} />
					</motion.div>
				</div>
			</div>
		</section>
	);
}