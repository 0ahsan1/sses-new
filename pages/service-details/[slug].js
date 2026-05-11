import React from 'react';
import { useRouter } from 'next/router';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MapPin, Calendar, Zap, ArrowLeft, CheckCircle, Star, Phone, Mail, Clock, Users, Award } from "lucide-react";
import Layout from "@/components/Layout";
import {strapiBasePath, strapiConfig, strapiImageLoader} from "@/services/ApiService";
import Image from 'next/image';
import Link from 'next/link';
import {queryObjectBuilder} from "@/lib/utils";
import axios from "axios";
import qs from "qs";
import { FAQ } from "@/components/FAQ";
import CTASection from "@/components/home/CTA";
import styles from "./style.module.scss";

export default function ServiceDetail({ service }) {
	const router = useRouter();
	const project = service?.data?.[0] || service?.[0] || service;
	console.log('Service Details', project)
	if (router.isFallback) {
		return <div>Loading...</div>;
	}
	
	if (!project) {
		return <div>Service details not found</div>;
	}
	return (
		<Layout>
			<div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
				{/* Hero Section with Main Image */}
				<div className="relative h-96 md:h-[500px] overflow-hidden">

					<div className="absolute inset-0 bg-gray-900" />
					<div className="absolute inset-0 flex items-center justify-center">
						<div className="text-center text-white px-6">
							<Link href={'/services'} className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
								<ArrowLeft className="mr-2 h-4 w-4" /> <span>Back to Services</span>
							</Link>
							<h1 className="text-4xl md:text-5xl font-bold mb-4 max-w-7xl mx-auto">{project.title}</h1>
							<p className="text-xl text-white/90 max-w-3xl mx-auto">
								{project.description?.[0]?.children?.[0]?.text || 'Professional solar solutions for your energy needs'}
							</p>
						</div>
					</div>
				</div>

				{/* Service Details Content */}
				<div className="container mx-auto px-4 py-16 blogs">
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
						{/* Main Content */}
						<div className="lg:col-span-2 space-y-8">
							{/* Service Overview */}
							<Card>
								<div>
									{project.image?.url && (
										<Image
											src={project.image.url}
											alt={project.title}
											width={100}
											height={100}
											className={'w-full h-full object-cover'}
											loader={strapiImageLoader}
											priority
										/>
									)}
								</div>
								<CardHeader>
									<CardTitle className="text-2xl">Service Overview</CardTitle>
								</CardHeader>
								<CardContent>
									<div  className={`${styles.blogContentDesign
									} ${styles.postBlogBannerDesign} ${styles.blogContentPage} ${styles.blogsPageBanner}  editor-content-fonts-blogs`}>
										{project.content ? (
											<div dangerouslySetInnerHTML={{ __html: project.content }} />
										) : (
											<p className="text-gray-600">
												Our comprehensive solar solutions are designed to meet your specific energy needs. 
												We provide end-to-end services from consultation to installation and maintenance.
											</p>
										)}
									</div>
								</CardContent>
							</Card>

							{/* Key Features */}
							<Card>
								<CardHeader>
									<CardTitle className="text-2xl">Key Features</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										{[
											{ icon: CheckCircle, title: "Expert Installation", description: "Professional team with years of experience" },
											{ icon: Award, title: "Quality Materials", description: "Premium solar panels and equipment" },
											{ icon: Clock, title: "Timely Delivery", description: "Projects completed on schedule" },
											{ icon: Users, title: "Customer Support", description: "24/7 assistance and maintenance" },
										].map((feature, index) => (
											<div key={index} className="flex items-start space-x-3">
												<feature.icon className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
												<div>
													<h4 className="font-semibold">{feature.title}</h4>
													<p className="text-gray-600 text-sm">{feature.description}</p>
												</div>
											</div>
										))}
									</div>
								</CardContent>
							</Card>

							{/* FAQ Section */}
							{project.faq && (
								<FAQ data={project.faq} />
							)}
						</div>

						{/* Sidebar */}
						<div className="space-y-6">
							{/* Quick Info Card */}
							<Card className="sticky top-6 z-10">
								<CardHeader>
									<CardTitle className="text-xl">Quick Info</CardTitle>
								</CardHeader>
								<CardContent className="space-y-4">
									<div className="flex items-center space-x-3">
										<Zap className="h-5 w-5 text-yellow-500" />
										<div>
											<p className="font-medium">Service Type</p>
											<p className="text-gray-600 text-sm">Solar Solutions</p>
										</div>
									</div>
									<div className="flex items-center space-x-3">
										<Clock className="h-5 w-5 text-blue-500" />
										<div>
											<p className="font-medium">Duration</p>
											<p className="text-gray-600 text-sm">2-4 weeks</p>
										</div>
									</div>
									<div className="flex items-center space-x-3">
										<Users className="h-5 w-5 text-green-500" />
										<div>
											<p className="font-medium">Team Size</p>
											<p className="text-gray-600 text-sm">3-5 experts</p>
										</div>
									</div>
								</CardContent>
							</Card>

							{/* CTA Card */}
							<Card className="bg-gradient-to-br from-amber-600 to-amber-700 text-white">
								<CardHeader>
									<CardTitle className="text-xl">Get Started Today</CardTitle>
									<CardDescription className="text-amber-100">
										Ready to switch to solar energy?
									</CardDescription>
								</CardHeader>
								<CardContent className="space-y-4">
									<Button size="lg" className="w-full bg-white text-orange-600 hover:bg-orange-50" asChild>
										<a href="tel:+923018207730">
											<Phone className="mr-2 h-4 w-4" />
											Call Now
										</a>
									</Button>
									<Button size="lg" variant="outline" className="w-full border-white  hover:bg-white text-orange-600" asChild>
										<a href="mailto:info.sustainablesolar@gmail.com">
											<Mail className="mr-2 h-4 w-4" />
											Email Us
										</a>
									</Button>
								</CardContent>
							</Card>
						</div>
					</div>
				</div>

			{/* Bottom CTA Section */}
			{project.cta && (
				<CTASection data={project.cta} />
			)}
		</div>
	</Layout>
	);
}


// ... (keep the existing imports)

export async function getServerSideProps({ params }) {
	const {slug} = params
	const url = `${strapiBasePath}/services?filters[slug][$eq]=${slug}`
	console.log('url',url)
	try {
		const {data} = await axios.get(
			`${strapiBasePath}/services?filters[slug][$eq]=${slug}&populate=image&populate=faq.items&populate=cta.button&populate=meta_info&populate=button`,
			strapiConfig
		);
		
		
		const pageEntry = data.data
		
		if (!pageEntry || pageEntry.length === 0) {
			return {
				notFound: true,
			};
		}
		
		// Extract the project data from the response
		
		
		return {
			props: {
				service: pageEntry,
			},
		};
	} catch (error) {
		console.error('Error fetching project:', error);
		return {
			notFound: true,
		};
	}
}