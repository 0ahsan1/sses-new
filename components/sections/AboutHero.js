import React, { useState, useEffect } from "react";
import { ArrowRight, Star, Shield, Award, ChevronDown, Download, FileText } from "lucide-react";
import Image from "next/image";
import {strapiImageLoader} from "@/services/ApiService";
import {useRouter} from "next/router";
import Link from "next/link";

const stats = [
	{ value: "12,000+", label: "Installations" },
	{ value: "18 Years", label: "Experience" },
	{ value: "4.9★", label: "Rating" },
	{ value: "$2.4M+", label: "Saved for Clients" },
];

export default function AboutHero({banner}) {
	const [count, setCount] = useState(0);
	const router = useRouter();
	
	console.log('about banner', banner.button[0]?.label)
	useEffect(() => {
		const timer = setInterval(() => {
			setCount((prev) => (prev < 12000 ? prev + 150 : 12000));
		}, 10);
		return () => clearInterval(timer);
	}, []);
	
	
	const handleNav = (href) => {
		// If it's a URL path, use router.push
		if (href.startsWith('/')) {
			router.push(href);
		} else {
			// If it's a CSS selector, use scrollIntoView
			const el = document.querySelector(href);
			if (el) el.scrollIntoView({ behavior: "smooth" });
		}
	};
	
	const handleDownloadBrochure = () => {
		// Create a link element and trigger download
		const link = document.createElement('a');
		link.href = '/brochure.pdf'; // Update with actual brochure path
		link.download = 'SSES-Company-Brochure.pdf';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
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
						<div className="inline-flex items-center gap-2  backdrop-blur-sm rounded-full px-4 py-1.5 mb-8">
							<span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
							<span className="text-orange-300 text-sm font-semibold tracking-wide">Certified Solar Experts · Est. 2007</span>
						</div>
						
						<h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[1.05] mb-6 tracking-tight">
							{banner?.title || ""}
							<span className="text-orange-400">{banner?.subtitle || ""}</span>
						</h1>
						
						<div dangerouslySetInnerHTML={{__html: banner?.description }} className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-xl mb-10">
						</div>
						
						<div className="flex flex-col sm:flex-row gap-4 mb-12">
							<Link
								href={banner.button[0].link}
								className="group solar-gradient px-7 py-4 rounded-2xl text-white font-bold text-lg shadow-2xl shadow-orange-500/30 hover:shadow-orange-500/50 hover:opacity-95 transition-all duration-300 flex items-center justify-center gap-3"
							>
								{banner.button[0]?.label}
								<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
							</Link>
								<Link
									href={banner.button[1].link}
									className="group px-7 py-4 rounded-2xl border border-orange-500/30 text-orange-300 font-bold text-lg hover:bg-orange-500/10 transition-all duration-300 flex items-center justify-center gap-3 backdrop-blur-sm"
								>
									<Download className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
									{banner.button[1]?.label}
								</Link>
							
						</div>
						
					</div>
					
					{/* Right: Visual */}
					<div className="hidden lg:flex items-center justify-center relative">
						{/* Glow ring */}
						<div className="absolute w-[400px] h-[400px] bg-orange-500/20 rounded-full blur-2xl" />
						
						<div className="relative animate-float">
							{/* Main circle with about page specific image */}
							<div className="w-[420px] h-[420px] rounded-full bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-white/10 backdrop-blur-xl flex items-center justify-center overflow-hidden shadow-2xl">
								<Image
									src={banner?.image?.url ?? 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=500&q=80'}
									loader={strapiImageLoader}
									width={500}
									height={500}
									alt="Solar company team and installations"
									className="w-full h-full object-cover opacity-60"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />
							</div>
						</div>
					</div>
					
					{/* Mobile Visual */}
					<div className="lg:hidden relative">
						<div className="relative">
							<Image
								src={banner?.image?.url ?? 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&q=80'}
								loader={strapiImageLoader}
								width={800}
								height={400}
								alt="Solar company team"
								className="w-full h-64 object-cover rounded-2xl opacity-80"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent rounded-2xl" />
							<div className="absolute bottom-4 left-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 text-center">
								<FileText className="w-8 h-8 text-orange-400 mx-auto mb-2" />
								<div className="text-white font-bold text-sm">Download Our Company Brochure</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			
			{/* Scroll indicator */}
			<button
				onClick={() => handleNav("#about-content")}
				className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 hover:text-white/70 transition-colors"
			>
				<span className="text-xs font-medium tracking-widest uppercase">Learn More</span>
				<ChevronDown className="w-5 h-5 animate-bounce" />
			</button>
		</section>
	);
}