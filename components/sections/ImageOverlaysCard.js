import React from 'react';
import { motion } from 'framer-motion';
import Link from "next/link";
import {strapiImageLoader, strapiImagePath} from "@/services/ApiService";
import Image from "next/image";

export default function ImageOverlayCards({ services }) {
	console.log('ImageOverlayCards services',services)
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{services.map((service, idx) => (
				<motion.div
					key={service.id}
					initial={{ opacity: 0, scale: 0.95 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ delay: idx * 0.05 }}
					className="group relative overflow-hidden rounded-3xl aspect-[4/5] cursor-pointer"
				>
					<Image
						src={service.image.url || `https://images.unsplash.com/photo-${1550000000000 + idx}?w=600&h=800&fit=crop`}
						alt={service.title}
						width={40}
						height={40}
						loader={strapiImageLoader}
						className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
					/>
					
					<div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" />
					
					<div className="absolute inset-0 p-8 flex flex-col justify-end">
						<motion.div
							initial={{ y: 20, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{ delay: 0.1 + idx * 0.05 }}
						>
							<h3 className="text-white font-bold text-3xl mb-3 group-hover:text-amber-400 transition-colors">
								{service.title}
							</h3>
							<p className="text-slate-200 leading-relaxed opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
								{service.description?.[0]?.children?.[0]?.text}
							</p>
							<div className="text-right">
								<Link
									className="mt-2 text-gray-100 border-b border-gray-600"
									href={'/services-details/'+service.slug ?? '#'}
								>
									Lean More
								</Link>
							</div>
						</motion.div>
					</div>
				</motion.div>
			))}
		</div>
	);
}