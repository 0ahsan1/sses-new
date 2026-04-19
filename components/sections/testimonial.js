import { motion } from "framer-motion";
import {useEffect, useState} from "react";
import { CheckCircle2, Clock, Users, Quote, ChevronLeft, ChevronRight } from "lucide-react";

const fadeUp = {
	hidden: { opacity: 0, y: 24 },
	visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" } }),
};


export const Testimonial = ({data}) =>{
	const [activeTestimonial, setActiveTestimonial] = useState(0);
	console.log('Testimonial data',data)
	
	useEffect(() => {
		const t = setInterval(() => setActiveTestimonial(p => (p + 1) % data.items.length), 5000);
		return () => clearInterval(t);
	}, [data?.items?.length]);
	
	return  <>
		<section className="py-20 bg-slate-100">
			<div className="max-w-5xl mx-auto px-5 grid md:grid-cols-2 gap-12 items-center">
				{/* Left image */}
				<motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
					<img src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=700&q=80"
					     alt="Solar installation" className="rounded-2xl w-full h-72 object-cover shadow-lg" />
				</motion.div>
				
				{/* Right testimonial */}
				<motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}>
					<p className="text-orange-500 font-semibold text-sm mb-1 tracking-wide">Our Testimonial</p>
					<h2 className="text-2xl md:text-3xl font-bold mb-6">{data?.title}</h2>
					
					<div className="relative min-h-[160px]">
						<Quote className="w-10 h-10 text-orange-400 mb-4 fill-orange-400" />
						{data?.items?.map((item, i) => (
							<motion.div key={i}
							            initial={{ opacity: 0 }} animate={{ opacity: i === activeTestimonial ? 1 : 0 }}
							            transition={{ duration: 0.4 }}
							            className={`${i === activeTestimonial ? "block" : "hidden"}`}>
								<p className="text-gray-600 text-sm leading-relaxed mb-4">"{item.description}"</p>
								<p className="font-bold text-gray-800">- {item.title}</p>
								<p className="text-sm text-orange-400 mt-2"> ({item.subtitle})</p>
							</motion.div>
						))}
					</div>
					
					{/* Dots */}
					<div className="flex items-center gap-2 mt-6">
						{data?.items?.map((_, i) => (
							<button key={i} onClick={() => setActiveTestimonial(i)}
							        className={`h-1.5 rounded-full transition-all duration-300 ${i === activeTestimonial ? "bg-orange-500 w-8" : "bg-gray-300 w-4"}`} />
						))}
					</div>
				</motion.div>
			</div>
		</section>
	</>
}