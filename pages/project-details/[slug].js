import React from 'react';
import { useRouter } from 'next/router';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MapPin, Calendar, Zap, ArrowLeft, CheckCircle, Award, Phone, Mail, Clock, Users, Star } from "lucide-react";
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

export default function ProjectDetail({ project }) {
	const router = useRouter();
	const projectData = project?.data?.[0] || project?.[0] || project;
	console.log('ProjectDetail', projectData)
	if (router.isFallback) {
		return <div>Loading...</div>;
	}
	
	if (!projectData) {
		return <div>Project not found</div>;
	}
	return (
		<Layout>
			<div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
				{/* Hero Section with Main Image */}
				<div className="relative h-96 md:h-[500px] overflow-hidden">
					<div className="absolute inset-0 bg-gray-900" />
					<div className="absolute inset-0 flex items-center justify-center">
						<div className="text-center text-white px-6">
							<Link href={'/projects'} className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
								<ArrowLeft className="mr-2 h-4 w-4" /> <span>Back to Projects</span>
							</Link>
							<h1 className="text-4xl md:text-5xl font-bold mb-4 max-w-7xl mx-auto">{projectData.title}</h1>
							<p className="text-xl text-white/90 max-w-3xl mx-auto">
								{projectData.description?.[0]?.children?.[0]?.text || projectData.description || 'Professional solar energy solutions for your needs'}
							</p>
						</div>
					</div>
				</div>

				{/* Project Details Content */}
				<div className="container mx-auto px-4 py-16 blogs">
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
						{/* Main Content */}
						<div className="lg:col-span-2 space-y-8">
							{/* Project Overview */}
							<Card>
								<div>
									{projectData.image[0]?.url && (
										<Image
											src={projectData.image[0].url}
											alt={projectData.title}
											width={100}
											height={100}
											className={'w-full h-full object-cover'}
											loader={strapiImageLoader}
											priority
										/>
									)}
								</div>
								<CardHeader>
									<CardTitle className="text-2xl">Project Overview</CardTitle>
								</CardHeader>
								<CardContent>
									<div className={`${styles.blogContentDesign
									} ${styles.postBlogBannerDesign} ${styles.blogContentPage} ${styles.blogsPageBanner}  editor-content-fonts-blogs`}>
										{projectData.content ? (
											<div dangerouslySetInnerHTML={{ __html: projectData.content }} />
										) : (
											<p className="text-gray-600">
												This project showcases our commitment to excellence in solar energy solutions. 
												From initial consultation to final installation, we ensure quality and efficiency at every step.
											</p>
										)}
									</div>
								</CardContent>
							</Card>

							{/* Project Information */}
							<Card>
								<CardHeader>
									<CardTitle className="text-2xl">Project Information</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
										{projectData.info?.date && (
											<div className="flex items-center space-x-3">
												<Calendar className="h-5 w-5 text-green-500" />
												<div>
													<p className="font-medium">Project Date</p>
													<p className="text-gray-600 text-sm">{projectData.info.date}</p>
												</div>
											</div>
										)}
										{projectData.info?.author && (
											<div className="flex items-center space-x-3">
												<Users className="h-5 w-5 text-blue-500" />
												<div>
													<p className="font-medium">Project By</p>
													<p className="text-gray-600 text-sm">{projectData.info.author}</p>
												</div>
											</div>
										)}
										{projectData.info?.customer && (
											<div className="flex items-center space-x-3">
												<Star className="h-5 w-5 text-yellow-500" />
												<div>
													<p className="font-medium">Customer</p>
													<p className="text-gray-600 text-sm">{projectData.info.customer}</p>
												</div>
											</div>
										)}
										{projectData.info?.category && (
											<div className="flex items-center space-x-3">
												<Zap className="h-5 w-5 text-orange-500" />
												<div>
													<p className="font-medium">Category</p>
													<p className="text-gray-600 text-sm">{projectData.info.category}</p>
												</div>
											</div>
										)}
										{projectData.category && (
											<div className="md:col-span-2">
												<p className="font-medium mb-2">Service Category</p>
												<Badge variant="outline">{projectData.category.name}</Badge>
											</div>
										)}
									</div>
								</CardContent>
							</Card>

							{/* Key Features */}
							{projectData.features && projectData.features.length > 0 && (
								<Card>
									<CardHeader>
										<CardTitle className="text-2xl">Key Features</CardTitle>
									</CardHeader>
									<CardContent>
										<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
											{projectData.features.map((feature, index) => (
												<div key={index} className="flex items-start space-x-3">
													<CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
													<div>
														<p className="font-medium">{feature}</p>
													</div>
												</div>
											))}
										</div>
									</CardContent>
								</Card>
							)}

							{/* Gallery */}
							{projectData.image && projectData.image.length > 1 && (
								<Card>
									<CardHeader>
										<CardTitle className="text-2xl">Project Gallery</CardTitle>
									</CardHeader>
									<CardContent>
										<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
											{projectData.image.slice(1, 5).map((image, index) => (
												<div key={index} className="relative aspect-video rounded-lg overflow-hidden">
													<Image
														src={image.url}
														alt={`${projectData.title} - Gallery ${index + 2}`}
														fill
														className="object-cover hover:scale-105 transition-transform duration-300"
														loader={strapiImageLoader}
													/>
												</div>
											))}
										</div>
									</CardContent>
								</Card>
							)}

							{/* FAQ Section */}
							{projectData.faq && projectData.faq.items && projectData.faq.items.length > 0 && (
								<FAQ data={projectData.faq} />
							)}
						</div>

						{/* Sidebar */}
						<div className="space-y-6">
							{/* Quick Info Card */}
							<Card className="sticky top-6 z-10">
								<CardHeader>
									<CardTitle className="text-xl">Project Info</CardTitle>
								</CardHeader>
								<CardContent className="space-y-4">
									<div className="flex items-center space-x-3">
										<Zap className="h-5 w-5 text-yellow-500" />
										<div>
											<p className="font-medium">Project Type</p>
											<p className="text-gray-600 text-sm">Solar Installation</p>
										</div>
									</div>
									{projectData.info?.category && (
										<div className="flex items-center space-x-3">
											<Zap className="h-5 w-5 text-yellow-500" />
											<div>
												<p className="font-medium">System Type</p>
												<p className="text-gray-600 text-sm">{projectData.info.category}</p>
											</div>
										</div>
									)}
									<div className="flex items-center space-x-3">
										<Users className="h-5 w-5 text-green-500" />
										<div>
											<p className="font-medium">Team Size</p>
											<p className="text-gray-600 text-sm">4-6 experts</p>
										</div>
									</div>
								</CardContent>
							</Card>

							{/* CTA Card */}
							<Card className="bg-gradient-to-br from-amber-600 to-amber-700 text-white">
								<CardHeader>
									<CardTitle className="text-xl">Get Started Today</CardTitle>
									<CardDescription className="text-amber-100">
										Ready for your solar project?
									</CardDescription>
								</CardHeader>
								<CardContent className="space-y-4">
									<Button size="lg" className="w-full bg-white text-amber-600 hover:bg-amber-50" asChild>
										<a href="tel:+923018207730">
											<Phone className="mr-2 h-4 w-4" />
											Call Now
										</a>
									</Button>
									<Button size="lg" variant="outline" className="w-full border-white hover:bg-white text-amber-600" asChild>
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
				{projectData.cta && (
					<CTASection data={projectData.cta} />
				)}
			</div>
		</Layout>
	);
}


// ... (keep the existing imports)

export async function getServerSideProps({ params }) {
	try {
		const { data: resp } = await axios.get(
			`${strapiBasePath}/projects?filters[slug][$eq]=${params.slug}&populate=image&populate=faq.items&populate=cta.button&populate=meta_info&populate=info`,
			strapiConfig
		);
		
		const pageEntry = resp?.data?.[0] ?? null;
		
		if (!pageEntry) {
			return {
				notFound: true,
			};
		}
		
		// Extract the project data from the response
		
		
		return {
			props: {
				project: pageEntry,
			},
		};
	} catch (error) {
		console.error('Error fetching project:', error);
		return {
			notFound: true,
		};
	}
}