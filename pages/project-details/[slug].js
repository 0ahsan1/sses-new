import React from 'react';
import { useRouter } from 'next/router';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MapPin, Calendar, Zap, ArrowLeft } from "lucide-react";
import Layout from "@/components/Layout";
import {strapiBasePath, strapiConfig} from "@/services/ApiService";
import Image from 'next/image';
import Link from 'next/link';
import {queryObjectBuilder} from "@/lib/utils";
import axios from "axios";
import qs from "qs";


export default function ProjectDetail({ project }) {
	const router = useRouter();
	console.log('ProjectDetail',project)
	if (router.isFallback) {
		return <div>Loading...</div>;
	}
	
	if (!project) {
		return <div>Project not found</div>;
	}
	
	return (
		<Layout>
			<div className="container mx-auto px-4 py-12">
				<Button variant="ghost" className="mb-6" onClick={() => router.back()}>
					<ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
				</Button>
				
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
					<div className="space-y-6">
						<h1 className="text-4xl font-bold">{project.title}</h1>
						<p className="text-lg text-gray-600 dark:text-gray-300">
							{project.description}
						</p>
						
						<div className="flex flex-wrap gap-2">
							{project.categories?.map((category) => (
								<Badge key={category.id} variant="outline">
									{category.name}
								</Badge>
							))}
						</div>
						
						<div className="grid grid-cols-2 gap-4 pt-4">
							<div className="flex items-center space-x-2">
								<MapPin className="h-5 w-5 text-primary" />
								<span>{project.location}</span>
							</div>
							<div className="flex items-center space-x-2">
								<Calendar className="h-5 w-5 text-primary" />
								<span>{project.completionDate}</span>
							</div>
							{project.capacity && (
								<div className="flex items-center space-x-2">
									<Zap className="h-5 w-5 text-primary" />
									<span>{project.capacity} kW</span>
								</div>
							)}
						</div>
						
						{project.features && (
							<div className="pt-4">
								<h3 className="text-xl font-semibold mb-3">Key Features</h3>
								<ul className="list-disc pl-5 space-y-2">
									{project.features.map((feature, index) => (
										<li key={index}>{feature}</li>
									))}
								</ul>
							</div>
						)}
					</div>
					
					<div className="relative h-96 lg:h-auto">
						{project.images?.[0]?.url && (
							<Image
								src={`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${project.images[0].url}`}
								alt={project.title}
								fill
								className="rounded-lg object-cover"
								priority
							/>
						)}
					</div>
				</div>
				
				{project.content && (
					<Card className="mb-12">
						<CardHeader>
							<CardTitle>Project Details</CardTitle>
						</CardHeader>
						<CardContent>
							<div
								className="prose dark:prose-invert max-w-none"
								dangerouslySetInnerHTML={{ __html: project.content }}
							/>
						</CardContent>
					</Card>
				)}
				
				{project.gallery?.length > 0 && (
					<div className="mb-12">
						<h2 className="text-2xl font-bold mb-6">Gallery</h2>
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
							{project.gallery.map((image, index) => (
								<div key={index} className="relative h-64 rounded-lg overflow-hidden">
									<Image
										src={`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${image.url}`}
										alt={`${project.title} - ${index + 1}`}
										fill
										className="object-cover hover:scale-105 transition-transform duration-300"
									/>
								</div>
							))}
						</div>
					</div>
				)}
			</div>
		</Layout>
	);
}


// ... (keep the existing imports)

export async function getServerSideProps({ params }) {
	try {
		const queryObject = queryObjectBuilder("projects", {
			filters: {
				slug: {
					$eq: params.slug
				}
			},
			populate: {
				images: '*',
				gallery: '*',
				categories: '*'
			}
		});
		
		const { data: resp } = await axios.get(
			`${strapiBasePath}/webpages`,
			{
				...strapiConfig,
				params: queryObject,
				paramsSerializer: {
					serialize: (params) => qs.stringify(params, { encodeValuesOnly: true }),
				},
			}
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