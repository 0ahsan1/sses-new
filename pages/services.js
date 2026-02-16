import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp, Battery, Grid3X3, Zap, Sun, Home, Building, Factory, Sprout } from "lucide-react";
import Layout from "@/components/Layout";
import {queryObjectBuilder} from "@/lib/utils";
import axios from "axios";
import {strapiBasePath, strapiConfig} from "@/services/ApiService";
import qs from "qs";
import HeroSection from "@/components/home/HeroSection";
import {FAQ} from "@/components/FAQ";
import Link from "next/link";
import LeftContent from "@/components/sections/leftContent";
import RightContent from "@/components/sections/RightContent";
import Feature from "@/components/sections/Feature";
import {CardSection} from "@/components/sections/cardSection";
import ImageOverlayCards from "@/components/sections/ImageOverlaysCard";
import CTASection from "@/components/home/CTA";

export default function Services({data}) {
	const [expandedService, setExpandedService] = useState(null);
	const serviceSection = data.service_section;
	const services = serviceSection.services;
	const sectorServices = [
		{
			icon: Home,
			title: "Residential Solar",
			description: "Custom home solar solutions from 3kW to 20kW systems",
			color: "text-blue-600"
		},
		{
			icon: Building,
			title: "Commercial Solar",
			description: "Business solar installations from 50kW to 500kW capacity",
			color: "text-green-600"
		},
		{
			icon: Factory,
			title: "Industrial Solar",
			description: "Large-scale industrial systems up to 5MW capacity",
			color: "text-purple-600"
		},
		{
			icon: Sprout,
			title: "Agricultural Solar",
			description: "Solar pumping and irrigation solutions for farms",
			color: "text-orange-600"
		}
	];
	console.log('Services services',data)
	
	return (
		<Layout>
			<div className="">
				{/* Hero Section */}
				<HeroSection banner={data.banner} />
				
				{/* Main Services */}
				<div className="py-20">
					<div className="max-w-7xl mx-auto px-6">
						<LeftContent data={data.boardA} />
						<RightContent data={data.boardB} />
						<CTASection data={data.ctaA} />
						<LeftContent data={data.boardC} />
						<Feature data={data.boardD} />
						{/* Sector Services */}
						<div className="py-10 bg-white">
							<div className="max-w-7xl mx-auto px-6">
								<div className="text-center mb-16">
									<h2 className="text-4xl font-bold text-gray-900 mb-4">
										Solutions by Sector
									</h2>
									<p className="text-xl text-gray-600">
										Specialized solar solutions tailored for different industries and applications
									</p>
								</div>
								
								<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
									{sectorServices.map((sector, index) => (
										<Card key={index} className="text-center p-6 hover:shadow-xl transition-shadow duration-300 border-0 shadow-md">
											<div className={`w-16 h-16 mx-auto mb-4 ${sector.color} bg-opacity-10 rounded-xl flex items-center justify-center`}>
												<sector.icon className={`w-8 h-8 ${sector.color}`} />
											</div>
											<h3 className="text-xl font-bold text-gray-900 mb-3">{sector.title}</h3>
											<p className="text-gray-600 mb-4">{sector.description}</p>
											<Button variant="outline" className="w-full">
												Learn More
											</Button>
										</Card>
									))}
								</div>
							</div>
						</div>
						<CardSection data={data?.service_section} />
					</div>
				</div>
				<CTASection data={data.ctaB} />
				{data?.faq && <FAQ data={data.faq} objKey="faq" />}
			
			</div>
		</Layout>
	
	);
}
export async function getServerSideProps() {
	const queryObject = queryObjectBuilder("services")
	
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