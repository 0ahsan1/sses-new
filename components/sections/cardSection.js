import ImageOverlayCards from "@/components/sections/ImageOverlaysCard";
import { motion } from 'framer-motion';

export const CardSection = ({data}) =>{
	return  <motion.section
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				viewport={{ once: true }}
				transition={{ duration: 0.8 }}
			>
				<div className="mb-8 py-10 text-center">
					<h2 className="text-4xl font-bold text-gray-900 mb-3">{data?.title}</h2>
					<div className="text-slate-400" dangerouslySetInnerHTML={{__html: data?.description}}></div>
				</div>
				<ImageOverlayCards services={data?.services} />
			</motion.section>
}