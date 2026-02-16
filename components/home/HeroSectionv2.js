import React from "react";
import { ArrowRight, Sun } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import {createPageUrl} from "@/lib/urls";
import Image from "next/image";
import {STRAPI_BASE_URL} from "@/constants";

export default function HeroSectionV2({ banner }) {
	const title = banner?.title || "Power Your Future with";
	const description = banner?.description || `
    <p>Transform your home or business with premium solar solutions.
    <br />Best prices in Pakistan. Zero down payment options available.</p>
  `;
	const button = banner?.button?.[0];
	const backgroundImage = banner?.image?.formats?.large?.url ||
		banner?.image?.url ||
		'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1920';
	console.log('hero image',`${STRAPI_BASE_URL}${backgroundImage}`)
	// Parse HTML description safely
	const createMarkup = (html) => {
		return { __html: html };
	};
	return (
		<section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
			{/* Decorative elements */}
			<div className="absolute inset-0 overflow-hidden">
				<div className="absolute top-20 right-10 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl" />
				<div className="absolute bottom-10 left-10 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl" />
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-amber-400/5 rounded-full" />
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-amber-400/5 rounded-full" />
			</div>
			
			<div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
				<div className="grid lg:grid-cols-2 gap-16 items-center">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, ease: "easeOut" }}
					>
						<div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/20 rounded-full px-4 py-1.5 mb-8">
							<Sun className="w-4 h-4 text-amber-400" />
							<span className="text-amber-300 text-sm font-medium tracking-wide">Clean Energy Solutions</span>
						</div>
						
						<h1 className="text-5xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight">
							Power Your
							<span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500 mt-2">
                Future
              </span>
							<span className="block text-white/90 mt-2">With Solar</span>
						</h1>
						
						<p className="mt-8 text-lg text-slate-400 leading-relaxed max-w-lg">
							Transform your energy consumption with premium solar installations.
							We design, install, and maintain systems that save you money and protect the planet.
						</p>
						
						<div className="mt-10 flex flex-wrap gap-4">
							<Link
								
								href={createPageUrl("Services")}
								className="group inline-flex items-center gap-3 bg-amber-400 hover:bg-amber-300 text-slate-900 font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-amber-400/25"
							>
								Explore Services
								<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
							</Link>
							<a
								href="#stats"
								className="inline-flex items-center gap-3 border border-slate-600 hover:border-slate-400 text-white font-medium px-8 py-4 rounded-full transition-all duration-300"
							>
								Learn More
							</a>
						</div>
					</motion.div>
					
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
						className="hidden lg:block"
					>
						<div className="relative">
							<div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-transparent rounded-3xl blur-2xl" />
							<Image
								src={`${STRAPI_BASE_URL}${backgroundImage}`}
								width={100}
								height={100}
								unoptimized={true}
								alt={banner?.image?.alternativeText || "Solar panels installation"}
								className="relative rounded-3xl shadow-2xl shadow-black/40 object-cover w-full h-[500px]"
							/>
							<div className="absolute -bottom-6 -left-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5">
								<p className="text-amber-400 text-3xl font-bold">30%</p>
								<p className="text-white/70 text-sm mt-1">Avg. Energy Savings</p>
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}