import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Shield, ArrowRight, Globe, HandCoins } from "lucide-react";
import Image from "next/image";
import {strapiImageLoader} from "@/services/ApiService";

const features = [
	{ icon: Shield, title: "Robust Data Protection", desc: "Your privacy and security are our top priorities. We use advanced encryption technologies and secure servers." },
	{ icon: HandCoins, title: "Fair & Honest Transactions", desc: "We believe in complete transparency and fairness. Every transaction means no hidden fees, no inflated exchange rates." },
	{ icon: Globe, title: "Global Money Transfers", desc: "Sending money across borders has never been easier. Our global money transfer service allows you to send funds anywhere." },
];

const stats = [
	{ value: "7M+", label: "Total Users Around The World" },
	{ value: "60+", label: "Countries Served" },
	{ value: "35+", label: "Total Daily Transactions" },
	{ value: "18+", label: "Years Of Experience" },
];

export default function RightContent({data}) {
	return (
		<section className="bg-white py-10 ">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Content Grid */}
				<div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
					{/* Image */}
					<motion.div
						initial={{ opacity: 0, x: -30 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className="relative"
					>
						<div className="rounded-2xl overflow-hidden bg-[#fc6e0b]/5 p-6">
							<Image src={data?.image ? data?.image[0].url : '#'} className={'w-full'} width={500} height={100} loader={strapiImageLoader} />
						</div>
					</motion.div>
					<div>
						<motion.h2
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: 0.1 }}
							className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 leading-tight max-w-xl"
						>
							{data?.title}
						</motion.h2>
						<div className={'max-w-xl'} dangerouslySetInnerHTML={{__html:data.description}}>
						
						</div>
						{/* Features */}
						<motion.div
							initial={{ opacity: 0, x: 30 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6 }}
							className="space-y-8"
						>
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
						</motion.div>
					</div>
				</div>
				
			</div>
		</section>
	);
}