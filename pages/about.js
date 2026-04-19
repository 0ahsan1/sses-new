
import BudgetCalculator from "@/components/home/BudgetCalculator";
import ProjectShowcase from "@/components/home/ProjectShowCase";
import React from "react";
import ServicesSection from "@/components/home/ServicesSection";
import Layout from "@/components/Layout";
import {strapiBasePath, strapiConfig} from "@/services/ApiService";
import axios from "axios";
import {queryObjectBuilder} from "@/lib/utils";
import qs from "qs";
import {FAQ} from "@/components/FAQ";
import CTASection from "@/components/home/CTA";
import HeroSectionV3 from "@/components/home/HeroSectionV3";
import ServiceSlider from "@/components/Slider/ServiceSlider";
import LeftContent from "@/components/sections/leftContent";
import RightContent from "@/components/sections/RightContent";
import Team from "@/components/sections/team";
import {Testimonial} from "@/components/sections/testimonial";
import AboutHero from "@/components/sections/AboutHero";

export default function About({data}) {
	console.log('about data',data)
	
	return (
		 <Layout>
			<AboutHero banner={data.banner} />
			 <LeftContent data={data.boardA} />
			 <RightContent data={data.boardB} />
			 <CTASection data={data.ctaA} />
			 <RightContent data={data.boardC} />
			 <LeftContent data={data.boardD} />
			 <CTASection data={data.ctaB} />
			 <Testimonial data={data.testimonial} />
			<Team data={data.boardE} />
			{data?.faq && <FAQ data={data.faq} objKey="faq" />}
			<CTASection data={data.ctaC} />
		</Layout>
	);
}

export async function getServerSideProps() {
	const queryObject = queryObjectBuilder("about")
	
	try {
		const { data: resp } = await axios.get(
			`${strapiBasePath}/webpages`,
			{
				// keep your auth headers etc. inside this same config object
				...strapiConfig,
				params: queryObject,
				paramsSerializer: {
					serialize: (params) => qs.stringify(params, { encodeValuesOnly: true }),
				},
			}
		);
		
		// Strapi v4 shape: { data: [ { id, attributes: {...} } ], meta: {...} }
		const pageEntry = resp?.data?.[0] ?? null;
		
		return {
			props: {
				// if you want just attributes:
				data: pageEntry ? pageEntry : null,
			},
		};
	} catch (err) {
		// log useful error info
		console.error("Strapi error:", err?.response?.status, err?.response?.data || err?.message);
		return {
			props: {
				error: err?.response?.data ?? { message: err?.message || "Unknown error" },
			},
		};
	}
}