import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {strapiImageLoader} from "@/services/ApiService";


export default function ServiceSlider({data}) {
	const [startIndex, setStartIndex] = useState(0);
	const [visibleCount, setVisibleCount] = useState(3);
	console.log('ServiceSlider',data)
	// Update visible count based on screen size
	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < 768) {
				setVisibleCount(1); // Mobile: 1 card
			} else if (window.innerWidth < 1024) {
				setVisibleCount(2); // Tablet: 2 cards
			} else {
				setVisibleCount(3); // Desktop: 3 cards
			}
		};
		
		// Set initial value
		handleResize();
		
		// Add event listener
		window.addEventListener('resize', handleResize);
		
		// Cleanup
		return () => window.removeEventListener('resize', handleResize);
	}, []);
	
	const handlePrev = () => {
		setStartIndex((prev) => (prev === 0 ? data?.services.length - visibleCount : prev - 1));
	};
	
	const handleNext = () => {
		setStartIndex((prev) => (prev >= data?.services.length - visibleCount ? 0 : prev + 1));
	};
	
	const visibleProperties = [];
	for (let i = 0; i < visibleCount; i++) {
		visibleProperties.push(data?.services[(startIndex + i) % data?.services.length]);
	}
	
	return (
		<section className="py-20 px-6 lg:px-16 bg-white">
			<div className="max-w-7xl mx-auto">
				<div className="flex flex-col lg:flex-row gap-10 items-start">
					{/* Left text */}
					<div className="lg:w-[220px] flex-shrink-0 pt-2">
						<h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
							{data?.title}
						</h2>
						{data?.description && (
							<div className="text-sm sm:text-lg/8 text-secondary-light mt-2 line-clamp-3" dangerouslySetInnerHTML={{
								__html: data?.description
							}}></div>
						)}
						<div className="flex gap-3 mt-8">
							<button
								onClick={handlePrev}
								className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-primary-color hover:text-primary-color transition-all duration-300"
							>
								<ChevronLeft className="w-4 h-4" />
							</button>
							<button
								onClick={handleNext}
								className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-primary-color hover:text-primary-color transition-all duration-300"
							>
								<ChevronRight className="w-4 h-4" />
							</button>
						</div>
					</div>
					
					{/* Property cards */}
					<div className="flex-1 container">
						{/* Grid layout changes based on screen size */}
						<div className={`grid gap-5 ${
							visibleCount === 1
								? 'grid-cols-1 md:max-w-sm md:mx-auto' // Mobile: center single card
								: visibleCount === 2
									? 'grid-cols-1 md:grid-cols-2' // Tablet: 2 cards
									: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' // Desktop: 3 cards
						}`}>
							{visibleProperties && visibleProperties.length > 0 && visibleProperties.map((item, idx) => (
								<motion.div
									key={item.id + "-" + idx}
									initial={{ opacity: 0, x: 40 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ duration: 0.4, delay: idx * 0.08 }}
									className="group cursor-pointer"
								>
									<div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
										<Image
											src={item?.image?.url ?? item?.image?.url}
											alt={item?.image?.alternativeText}
											loader={strapiImageLoader}
											width={40}
											height={40}
											className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
										/>
									</div>
									<div className="mt-4 flex items-center justify-between bg-slate-50 rounded-xl px-5 py-4 group-hover:bg-indigo-50 transition-colors duration-300">
										<div>
											<p className="text-sm font-semibold text-gray-800">{item.title}</p>
											<div className="text-gray-500 font-bold text-xs mt-0.5">
												{item?.description[0].children[0].text}
											</div>
										</div>
									</div>
								</motion.div>
							))}
						</div>
					</div>
					
					{/* Mobile pagination indicator */}
					<div className="flex justify-center items-center md:hidden w-full">
						<div className="flex gap-1">
							{data?.items?.map((_, index) => (
								<div
									key={index}
									className={`h-2.5 rounded-full transition-all duration-300 ${index >= startIndex && index < startIndex + visibleCount
										? 'w-6 bg-primary-color'
										: 'w-2.5 bg-gray-300'
									}`}
								/>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}