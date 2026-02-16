import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import Link from "next/link";

export default function CTASection({data}) {
	
	return (
		<section className="py-28 bg-slate-950 relative overflow-hidden">
			<div className="absolute inset-0">
				<div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
				<div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
			</div>
			
			<div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
				>
					<h2 className="text-4xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
						{data?.title}
					</h2>
					{/*<p className="text-slate-400 mt-6 text-lg max-w-2xl mx-auto leading-relaxed">*/}
					{/*	{data.description?.[0]?.children?.[0]?.text}*/}
					{/*</p>*/}
					
					<div className="mt-10 flex flex-wrap justify-center gap-4">
						{data.button && data.button[0] &&
							<Link href={data.button[0].link} className="group inline-flex items-center gap-3 bg-amber-400 hover:bg-amber-300 text-slate-900 font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-amber-400/25">
							{data.button[0].label}
							<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
						</Link>}
						{data.button && data.button[1] &&
							<Link href={data.button[1].link} className="inline-flex items-center gap-3 border border-slate-700 hover:border-slate-500 text-white font-medium px-8 py-4 rounded-full transition-all duration-300">
								{data.button[1].label}
						</Link>}
					</div>
				</motion.div>
			</div>
		</section>
	);
}