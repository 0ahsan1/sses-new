import React from 'react';
import { useRouter } from 'next/router';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MapPin, Calendar, Zap, ArrowLeft } from "lucide-react";
import Layout from "@/components/Layout";
import {strapiBasePath, strapiConfig, strapiImageLoader} from "@/services/ApiService";
import Image from 'next/image';
import Link from 'next/link';
import {queryObjectBuilder} from "@/lib/utils";
import axios from "axios";
import qs from "qs";


export default function ServiceDetail({ service }) {
	const router = useRouter();
	const project = service && service.length ? service[0] : null;
	console.log('Service Details',project)
	if (router.isFallback) {
		return <div>Loading...</div>;
	}
	
	if (!project) {
		return <div>Service details not found</div>;
	}
	return (
		<Layout>
			<div className="container mx-auto px-4 py-12">
				<Link href={'/services'} className="" >
					<ArrowLeft className="mr-2 h-4 w-4 inline" /> <span>Back to Services</span>
				</Link>
				<div className={'flex justify-center py-4'}>
					<h1 className="text-4xl font-bold text-center">{project.title}</h1>
				</div>
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
					<div className="space-y-6">
						<p className="text-lg text-gray-600 dark:text-gray-300">
							{/*{project.description}*/}
						</p>
					</div>
					
				</div>
				{/*<Image src={project.image.url} width={100} height={100} loader={strapiImageLoader} alt={project.title} />*/}
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
			`${strapiBasePath}/services?filters[slug][$eq]=${slug}`,
			{
				headers: {
					Authorization: `${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`, // only if needed
				},
				populate: {
					images: '*',
				},
			}
		);
		
		
		const pageEntry = data.data
		
		if (!pageEntry) {
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