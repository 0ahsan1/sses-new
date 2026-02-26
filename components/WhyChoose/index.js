import { motion } from "framer-motion";
import {
	ShieldCheck,
	Bell,
	HeadphonesIcon,
	TrendingDown,
	Zap,
	Clock,
	Shield,
	Award,
	Users,
	Wrench,
	DollarSign
} from "lucide-react";
import Image from "next/image";
import {strapiImageLoader} from "@/services/ApiService";

const iconMap = {
	Shield,
	Award,
	Users,
	Clock,
	Wrench,
	DollarSign
};
export default function WhyChooseUsVariant({data}) {
	console.log('WhyChooseUsVariant data',data)
	
	const features = data?.items?.length > 0
		? data.items.map(feature => ({
			...feature,
			icon: iconMap[feature.icon] || Shield
		})): []
	const fadeUp = {
		hidden: { opacity: 0, y: 24 },
		visible: (i) => ({
			opacity: 1,
			y: 0,
			transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" }
		})
	};
	const midPoint = Math.ceil(features.length / 2)
	const leftFeatures = features.slice(0, midPoint)
	const rightFeatures = features.slice(midPoint)
	console.log('items',leftFeatures,rightFeatures)
	function FeatureItem({ feature, index, align = "left" }) {
		return (
			<motion.div
				variants={fadeUp}
				custom={index}
				className={`flex items-start gap-4 ${align === "right" ? "text-left" : "text-left"}`}
			>
				<div
					className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center mt-0.5"
					style={{ backgroundColor: "#fc6e0b" }}
				>
					<feature.icon className="w-4 h-4 text-white" strokeWidth={2.5} />				</div>
				<div>
					<h4 className="font-bold text-gray-900 text-[15px]">{feature.title}</h4>
					<p className="text-gray-500 text-sm leading-relaxed mt-1">{feature.description}</p>
				</div>
			</motion.div>
		);
	}
	return (
		<section className="relative w-full overflow-hidden py-20 px-6 lg:px-16" style={{ backgroundColor: "#fef9f5" }}>
			{/* Decorative sparkles */}
			{[
				{ top: "8%", left: "5%" },
				{ top: "12%", right: "8%" },
				{ bottom: "15%", left: "10%" },
				{ bottom: "10%", right: "5%" },
			].map((pos, i) => (
				<motion.div
					key={i}
					className="absolute text-orange-200 pointer-events-none"
					style={pos}
					animate={{ rotate: [0, 90, 180, 270, 360], scale: [1, 1.2, 1] }}
					transition={{ duration: 8, repeat: Infinity, delay: i * 1.5 }}
				>
					<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
						<path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41Z" />
					</svg>
				</motion.div>
			))}
			
			<div className="relative max-w-7xl mx-auto">
				{/* Header */}
				<motion.div
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					className="text-center mb-16"
				>
					<motion.span
						variants={fadeUp}
						custom={0}
						className="inline-block text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full border border-gray-300 text-gray-500 bg-white"
					>
						Why Choose Us
					</motion.span>
					<motion.h2
						variants={fadeUp}
						custom={1}
						className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mt-5 leading-tight"
					>
						{data.title}
					</motion.h2>
				</motion.div>
				
				{/* Content: Features — Phone — Features */}
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 items-center">
					{/* Left Features */}
					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: "-50px" }}
						className="space-y-10"
					>
						{leftFeatures.map((feature, i) => (
							<FeatureItem key={feature.title} feature={feature} index={i} align="left" />
						))}
					</motion.div>
					
					{/* Center Phone */}
					<motion.div
						initial={{ opacity: 0, scale: 0.88 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.7, ease: "easeOut" }}
						className="flex justify-center"
					>
						<div className="relative">
							<Image className={'h-full w-full'} src={data.image[0].url} loader={strapiImageLoader} width={40} height={40} alt={data.title || "Why Choose Us"} />
						</div>
					</motion.div>
					
					{/* Right Features */}
					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: "-50px" }}
						className="space-y-10"
					>
						{rightFeatures.map((feature, i) => (
							<FeatureItem key={feature.title} feature={feature} index={i} align="right" />
						))}
					</motion.div>
				</div>
			</div>
		</section>
	);
}