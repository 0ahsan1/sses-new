import React from 'react';
import { useRouter } from 'next/router';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar, Clock, User, ArrowLeft, Share2, Bookmark, Tag, MessageSquare, Eye } from "lucide-react";
import Layout from "@/components/Layout";
import {strapiBasePath, strapiConfig, strapiImageLoader} from "@/services/ApiService";
import Image from 'next/image';
import Link from 'next/link';
import axios from "axios";
import CTASection from "@/components/home/CTA";
import styles from "./style.module.scss";

export default function BlogDetail({ blog }) {
	const router = useRouter();
	const blogData = blog?.data?.[0] || blog?.[0] || blog;
	console.log('blogData',blogData)
	if (router.isFallback) {
		return <div>Loading...</div>;
	}
	
	if (!blogData) {
		return <div>Blog post not found</div>;
	}
	
	return (
		<Layout>
			<div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
				{/* Hero Section with Blog Image */}
				<div className="relative h-96 md:h-[500px] overflow-hidden">
					
					<div className="absolute inset-0 bg-gray-900" />
					<div className="absolute inset-0 flex items-center justify-center">
						<div className="text-center text-white px-6">
							<Link href={'/blog'} className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
								<ArrowLeft className="mr-2 h-4 w-4" /> <span>Back to Blog</span>
							</Link>
							<h1 className="text-4xl md:text-5xl font-bold mb-4 max-w-7xl mx-auto">{blogData.title}</h1>
							<p className="text-xl text-white/90 max-w-3xl mx-auto">
								{blogData.description?.[0]?.children?.[0]?.text || blogData.excerpt || 'Insights and updates from the solar energy industry'}
							</p>
						</div>
					</div>
				</div>

				{/* Blog Content */}
				<div className="container mx-auto px-4 py-16 blogs">
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
						{/* Main Content */}
						<div className="lg:col-span-2 space-y-8">
							{/* Blog Metadata */}
							{/*<Card>*/}
							{/*	<CardHeader>*/}
							{/*		<div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">*/}
							{/*			{blogData.author && (*/}
							{/*				<div className="flex items-center space-x-2">*/}
							{/*					<User className="h-4 w-4" />*/}
							{/*					<span>{blogData.author}</span>*/}
							{/*				</div>*/}
							{/*			)}*/}
							{/*			{blogData.date && (*/}
							{/*				<div className="flex items-center space-x-2">*/}
							{/*					<Calendar className="h-4 w-4" />*/}
							{/*					<span>{new Date(blogData.date).toLocaleDateString('en-US', { */}
							{/*						year: 'numeric', */}
							{/*						month: 'long', */}
							{/*						day: 'numeric' */}
							{/*					})}</span>*/}
							{/*				</div>*/}
							{/*			)}*/}
							{/*			{blogData.readTime && (*/}
							{/*				<div className="flex items-center space-x-2">*/}
							{/*					<Clock className="h-4 w-4" />*/}
							{/*					<span>{blogData.readTime}</span>*/}
							{/*				</div>*/}
							{/*			)}*/}
							{/*		</div>*/}
							{/*	</CardHeader>*/}
							{/*	<CardContent>*/}
							{/*		<div className="flex flex-wrap gap-2 mb-4">*/}
							{/*			{blogData.category && (*/}
							{/*				<Badge variant="outline">{blogData.category}</Badge>*/}
							{/*			)}*/}
							{/*			{blogData.tags && blogData.tags.map((tag, index) => (*/}
							{/*				<Badge key={index} variant="secondary">{tag}</Badge>*/}
							{/*			))}*/}
							{/*		</div>*/}
							{/*	</CardContent>*/}
							{/*</Card>*/}

							{/* Blog Content */}
							<Card>
								<div>
									{blogData.image[0]?.url && (
										<Image
											src={blogData.image[0].url}
											alt={blogData.title}
											width={100}
											height={100}
											className={'w-full h-full object-cover'}
											loader={strapiImageLoader}
											priority
										/>
									)}
								</div>
								<CardContent className="pt-6">
									<div className={`${styles.blogContentDesign
									} ${styles.postBlogBannerDesign} ${styles.blogContentPage} ${styles.blogsPageBanner}  editor-content-fonts-blogs`}>
										{blogData.content ? (
											<div dangerouslySetInnerHTML={{ __html: blogData.content }} />
										) : (
											<div className="space-y-4">
												<p>
													This is a comprehensive blog post about solar energy solutions and their impact on the industry. 
													Our team at SSES is committed to providing valuable insights and updates to help you make 
													informed decisions about your energy needs.
												</p>
												<h2>Key Takeaways</h2>
												<ul>
													<li>Understanding the latest solar technology trends</li>
													<li>Cost-benefit analysis of solar installations</li>
													<li>Government incentives and policies</li>
													<li>Future of renewable energy in Pakistan</li>
												</ul>
												<p>
													Stay tuned for more updates and insights from our expert team. We're here to guide you 
													through your solar energy journey with professional advice and reliable solutions.
												</p>
											</div>
										)}
									</div>
								</CardContent>
							</Card>

							{/* Share and Engagement */}
							<Card>
								<CardContent className="pt-6">
									<div className="flex flex-wrap items-center justify-between gap-4">
										<div className="flex items-center space-x-4">
											<Button variant="outline" size="sm">
												<Share2 className="mr-2 h-4 w-4" />
												Share
											</Button>
											<Button variant="outline" size="sm">
												<Bookmark className="mr-2 h-4 w-4" />
												Save
											</Button>
										</div>
										<div className="flex items-center space-x-4 text-sm text-gray-600">
											<div className="flex items-center space-x-1">
												<Eye className="h-4 w-4" />
												<span>{blogData.views || 0} views</span>
											</div>
											<div className="flex items-center space-x-1">
												<MessageSquare className="h-4 w-4" />
												<span>{blogData.comments || 0} comments</span>
											</div>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>

						{/* Sidebar */}
						<div className="space-y-6">
							{/* Author Card */}
							<Card>
								<CardHeader>
									<CardTitle className="text-xl">About the Author</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="flex items-center space-x-4 mb-4">
										<div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center text-white font-bold">
											{blogData.author?.charAt(0) || 'S'}
										</div>
										<div>
											<h4 className="font-semibold">{blogData.author || 'SSES Team'}</h4>
											<p className="text-sm text-gray-600">Solar Energy Expert</p>
										</div>
									</div>
									<p className="text-sm text-gray-600">
										Our expert team brings years of experience in solar energy solutions, 
										providing valuable insights and practical advice for your energy needs.
									</p>
								</CardContent>
							</Card>

							{/* Quick Actions */}
							<Card className="bg-gradient-to-br bg-gray-900 text-white">
								<CardHeader>
									<CardTitle className="text-xl">Get Solar Solution</CardTitle>
									<CardDescription className="text-amber-100">
										Ready to switch to solar energy?
									</CardDescription>
								</CardHeader>
								<CardContent className="space-y-4">
									<Button size="lg" className="w-full bg-white text-amber-600 hover:bg-amber-50" asChild>
										<a href="tel:+923018207730">
											<User className="mr-2 h-4 w-4" />
											Get Consultation
										</a>
									</Button>
									<Button size="lg" variant="outline" className="w-full border-white hover:bg-white text-amber-600" asChild>
										<a href="mailto:info.sustainablesolar@gmail.com">
											<MessageSquare className="mr-2 h-4 w-4" />
											Email Us
										</a>
									</Button>
								</CardContent>
							</Card>

							{/* Related Posts */}
							<Card>
								<CardHeader>
									<CardTitle className="text-xl">Related Posts</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="space-y-4">
										<div className="border-l-4 border-amber-500 pl-4">
											<h4 className="font-semibold text-sm mb-1">Solar Panel Efficiency Guide</h4>
											<p className="text-xs text-gray-600">Learn about different panel types and their efficiency ratings</p>
										</div>
										<div className="border-l-4 border-gray-300 pl-4">
											<h4 className="font-semibold text-sm mb-1">Net Metering Explained</h4>
											<p className="text-xs text-gray-600">Understanding Pakistan's net metering policies</p>
										</div>
										<div className="border-l-4 border-gray-300 pl-4">
											<h4 className="font-semibold text-sm mb-1">Solar ROI Calculator</h4>
											<p className="text-xs text-gray-600">Calculate your solar investment returns</p>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
					</div>
				</div>

				{/* Bottom CTA Section */}
				{blogData.cta && (
					<CTASection data={blogData.cta} />
				)}
			</div>
		</Layout>
	);
}

export async function getServerSideProps({ params }) {
	try {
		// Try different endpoints to find blog content
		let resp;
		try {
			// Try blogs endpoint first
			resp = await axios.get(`${strapiBasePath}/blogs?populate=*`, strapiConfig);
		} catch (error) {
			try {
				// Try posts endpoint
				resp = await axios.get(`${strapiBasePath}/posts?populate=*`, strapiConfig);
			} catch (error2) {
				try {
					// Try articles endpoint
					resp = await axios.get(`${strapiBasePath}/articles?populate=*`, strapiConfig);
				} catch (error3) {
					// Fall back to webpages
					resp = await axios.get(`${strapiBasePath}/webpages?populate=*`, strapiConfig);
				}
			}
		}
		
		// Now try to find the specific blog by slug
		const dataArray = Array.isArray(resp?.data?.data) ? resp.data.data : [];
		const blogData = dataArray.find(item => item.slug === params.slug);
		
		if (!blogData) {
			return {
				notFound: true,
			};
		}
		
		return {
			props: {
				blog: blogData,
			},
		};
	} catch (error) {
		console.error('Error fetching blog:', error);
		return {
			notFound: true,
		};
	}
}
