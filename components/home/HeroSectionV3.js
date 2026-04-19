import React, { useState, useEffect } from "react";
import { ArrowRight, Star, Shield, Award, ChevronDown } from "lucide-react";
import Image from "next/image";
import {strapiImageLoader} from "@/services/ApiService";

const stats = [
	{ value: "12,000+", label: "Installations" },
	{ value: "18 Years", label: "Experience" },
	{ value: "4.9★", label: "Rating" },
	{ value: "$2.4M+", label: "Saved for Clients" },
];

export default function HeroSectionV3({banner}) {
	const [count, setCount] = useState(0);
	
	useEffect(() => {
		const timer = setInterval(() => {
			setCount((prev) => (prev < 12000 ? prev + 150 : 12000));
		}, 10);
		return () => clearInterval(timer);
	}, []);
	
	const handleNav = (href) => {
		const el = document.querySelector(href);
		if (el) el.scrollIntoView({ behavior: "smooth" });
	};
	
	return (
		<section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: "linear-gradient(135deg, #0f172a 0%, #1a2f5a 50%, #0f172a 100%)" }}>
			{/* Background Orbs */}
			<div className="absolute top-20 -right-40 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-3xl animate-pulse-slow" />
			<div className="absolute bottom-0 -left-40 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "2s" }} />
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/5 rounded-full blur-3xl" />
			
			{/* Subtle grid pattern */}
			<div className="absolute inset-0 opacity-[0.03]" style={{
				backgroundImage: "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)",
				backgroundSize: "60px 60px"
			}} />
			
			<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-36 w-full">
				<div className="grid lg:grid-cols-2 gap-16 items-center">
					{/* Left: Content */}
					<div>
						<div className="inline-flex items-center gap-2 bg-orange-500/15 border border-orange-500/20 backdrop-blur-sm rounded-full px-4 py-1.5 mb-8">
							<span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
							<span className="text-orange-300 text-sm font-semibold tracking-wide">Certified Solar Experts · Est. 2007</span>
						</div>
						
						<h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[1.05] mb-6 tracking-tight">
							{banner?.title}							<br />
							<span className="gradient-text">{banner?.subtitle}</span>
						</h1>
						
						<p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-xl mb-10">
							Join over 12,000 happy homeowners and businesses who switched to clean solar energy. We handle everything from consultation to installation — guaranteed.
						</p>
						
						<div className="flex flex-col sm:flex-row gap-4 mb-12">
							<button
								onClick={() => handleNav("#contact")}
								className="group solar-gradient px-7 py-4 rounded-2xl text-white font-bold text-lg shadow-2xl shadow-orange-500/30 hover:shadow-orange-500/50 hover:opacity-95 transition-all duration-300 flex items-center justify-center gap-3"
							>
								Get Free Solar Quote
								<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
							</button>
							<button
								onClick={() => handleNav("#solarCalculator")}
								className="group px-7 py-4 rounded-2xl border border-white/20 text-white font-bold text-lg hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-3 backdrop-blur-sm"
							>
								Calculate Savings
								<ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
							</button>
						</div>
						
						{/* Trust Badges */}
						<div className="flex flex-wrap items-center gap-4 mb-12">
							{[
								{ icon: <Shield className="w-4 h-4" />, text: "25-Year Warranty" },
								{ icon: <Award className="w-4 h-4" />, text: "Certified" },
								{ icon: <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />, text: "4.9/5 Rating" },
							].map((badge, i) => (
								<div key={i} className="flex items-center gap-2 bg-white/8 border border-white/10 backdrop-blur-sm rounded-full px-4 py-2">
									<span className="text-orange-400">{badge.icon}</span>
									<span className="text-white/80 text-sm font-medium">{badge.text}</span>
								</div>
							))}
						</div>
						
					</div>
					
					{/* Right: Visual */}
					<div className="hidden lg:flex items-center justify-center relative">
						{/* Glow ring */}
						<div className="absolute w-[400px] h-[400px] bg-orange-500/20 rounded-full blur-2xl" />
						
						<div className="relative animate-float">
							{/* Main circle with solar house illustration */}
							<div className="w-[420px] h-[420px] rounded-full bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-white/10 backdrop-blur-xl flex items-center justify-center overflow-hidden shadow-2xl">
								<Image
									src={banner?.image?.url ?? '#'}
									loader={strapiImageLoader}
									width={200}
									height={200}
									alt="Solar panels on rooftop"
									className="w-full h-full object-cover opacity-60"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />
								
								{/* Overlay stats */}
								<div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-4 text-center w-56">
									<div className="text-2xl font-black text-white mb-1">514280 PKR/yr</div>
									<div className="text-orange-300 text-sm font-semibold">Average Annual Savings</div>
								</div>
							</div>
							
							{/* Floating cards */}
							<div className="absolute -top-4 -right-8 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3 border border-gray-100">
								<div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
									<span className="text-green-600 text-lg font-black">↓</span>
								</div>
								<div>
									<div className="text-slate-900 font-bold text-sm">Bill Reduction</div>
									<div className="text-green-500 font-black text-lg">-87%</div>
								</div>
							</div>
							
							<div className="absolute -bottom-4 -left-8 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3 border border-gray-100">
								<div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
									<span className="text-2xl">☀️</span>
								</div>
								<div>
									<div className="text-slate-900 font-bold text-sm">Energy Generated</div>
									<div className="text-orange-500 font-black text-lg">8.4 MWh/yr</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			
			{/* Scroll indicator */}
			<button
				onClick={() => handleNav("#trust")}
				className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 hover:text-white/70 transition-colors"
			>
				<span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
				<ChevronDown className="w-5 h-5 animate-bounce" />
			</button>
		</section>
	);
}