import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import {strapiBasePath, strapiConfig, strapiImageLoader} from "@/services/ApiService";
import Image from 'next/image';
import Link from 'next/link';
import axios from "axios";

export default function Blog({ blogs }) {
  // Use the same data structure pattern that works in project details
  const blogsData = blogs?.data?.data || blogs?.data || blogs || [];
  
  // State for pagination
  const [visiblePosts, setVisiblePosts] = useState(6);
  const [loading, setLoading] = useState(false);
  
  // Get featured post (first post or marked as featured)
  const featuredPost = blogsData.find(blog => blog.featured) || blogsData[0];
  
  // Get other posts (exclude featured post)
  const allOtherPosts = blogsData.filter(blog => blog !== featuredPost);
  const otherPosts = allOtherPosts.slice(0, visiblePosts);
  
  // Load more function
  const loadMore = () => {
    setLoading(true);
    // Simulate loading delay for better UX
    setTimeout(() => {
      setVisiblePosts(prev => prev + 6);
      setLoading(false);
    }, 500);
  };
  
  // Check if there are more posts to load
  const hasMorePosts = visiblePosts < allOtherPosts.length;
  
  // Extract unique categories from blog data
  const categories = ["All Posts", ...new Set(blogsData.map(blog => blog.category).filter(Boolean))];
  
  const getCategoryColor = (category) => {
    const colors = {
      "Policy Updates": "bg-blue-100 text-blue-800",
      "Technology": "bg-green-100 text-green-800",
      "Cost Analysis": "bg-purple-100 text-purple-800",
      "Case Studies": "bg-orange-100 text-orange-800",
      "Maintenance": "bg-red-100 text-red-800",
      "Agriculture": "bg-emerald-100 text-emerald-800"
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };
  
  return (
      <Layout>
        <div className="min-h-screen bg-gray-50">
          
          {/* Hero Section */}
          <div className="bg-gradient-to-br from-slate-900 to-blue-900 py-20">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Solar Knowledge Hub
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Latest insights, guides, and updates from Pakistan's solar industry
              </p>
            </div>
          </div>
          
          {/* Categories Filter */}
          <div className="py-8 bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex flex-wrap gap-3 justify-center">
                {categories.map((category) => (
                    <Button
                        key={category}
                        variant="outline"
                        className="hover:bg-orange-50 hover:border-orange-200 hover:text-orange-700"
                    >
                      {category}
                    </Button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="py-20">
            <div className="max-w-7xl mx-auto px-6">
              {/* Featured Post */}
              <Card className="mb-16 overflow-hidden shadow-xl border-0">
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="aspect-[4/3] lg:aspect-auto relative">
                    {featuredPost?.image?.url ? (
                        <Image
                            src={featuredPost.image.url}
                            alt={featuredPost.title}
                            fill
                            className="w-full h-full object-cover"
                            loader={strapiImageLoader}
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-orange-400 to-amber-500" />
                    )}
                    <div className="absolute top-6 left-6">
                      <Badge className="bg-orange-600 text-white text-sm px-3 py-1">
                        Featured Article
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-8 lg:p-12 flex flex-col justify-center">
                    {featuredPost?.category && (
                      <Badge className={`w-fit mb-4 ${getCategoryColor(featuredPost.category)}`}>
                        {featuredPost.category}
                      </Badge>
                    )}
                    
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                      {featuredPost?.title || 'Latest Solar Insights'}
                    </h2>
                    
                    <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                      {featuredPost?.description?.[0]?.children?.[0]?.text || featuredPost?.excerpt || 'Discover the latest insights and updates from the solar energy industry.'}
                    </p>
                    
                    <div className="flex items-center text-gray-500 mb-6 space-x-4">
                      {featuredPost?.author && (
                          <div className="flex items-center">
                            <User className="w-4 h-4 mr-2" />
                            <span className="text-sm">{featuredPost.author}</span>
                          </div>
                      )}
                      {featuredPost?.date && (
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            <span className="text-sm">{new Date(featuredPost.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}</span>
                          </div>
                      )}
                      {featuredPost?.readTime && (
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2" />
                            <span className="text-sm">{featuredPost.readTime}</span>
                          </div>
                      )}
                    </div>
                    
                    {featuredPost?.slug ? (
                        <Link href={`/blog/${featuredPost.slug}`}>
                          <Button className="bg-orange-600 hover:bg-orange-700 w-fit">
                            Read Full Article
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                    ) : (
                        <Button className="bg-orange-600 hover:bg-orange-700 w-fit" disabled>
                          Read Full Article
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    )}
                  </CardContent>
                </div>
              </Card>
              
              {/* Recent Posts Grid */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                  Latest Articles
                </h2>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {otherPosts.map((post, index) => (
                      <Card key={post?.id || index} className="overflow-hidden hover:shadow-xl transition-shadow duration-300 border-0 shadow-lg">
                        <div className="aspect-[4/3] relative overflow-hidden">
                          {post?.image?.url ? (
                              <Image
                                  src={post.image.url}
                                  alt={post.title}
                                  fill
                                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                  loader={strapiImageLoader}
                              />
                          ) : (
                              <div className="w-full h-full bg-gradient-to-br from-blue-400 to-amber-500" />
                          )}
                        </div>
                        
                        <CardContent className="p-6">
                          {post?.category && (
                              <Badge className={`mb-3 ${getCategoryColor(post.category)}`}>
                                {post.category}
                              </Badge>
                          )}
                          
                          {post?.slug ? (
                              <Link href={`/blog/${post.slug}`}>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight hover:text-orange-600 transition-colors cursor-pointer">
                                  {post.title}
                                </h3>
                              </Link>
                          ) : (
                              <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                                {post.title}
                              </h3>
                          )}
                          
                          <p className="text-gray-600 mb-4 line-clamp-3">
                            {post?.description?.[0]?.children?.[0]?.text || post?.excerpt || 'Read more about this topic...'}
                          </p>
                          
                          <div className="flex items-center justify-between text-gray-500 text-sm mb-4">
                            {post?.author && (
                                <div className="flex items-center">
                                  <User className="w-4 h-4 mr-1" />
                                  <span>{post.author}</span>
                                </div>
                            )}
                            {post?.readTime && (
                                <div className="flex items-center">
                                  <Clock className="w-4 h-4 mr-1" />
                                  <span>{post.readTime}</span>
                                </div>
                            )}
                          </div>
                          
                          <div className="flex items-center justify-between">
                            {post?.date && (
                                <div className="flex items-center text-gray-500 text-sm">
                                  <Calendar className="w-4 h-4 mr-1" />
                                  <span>{new Date(post.date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                  })}</span>
                                </div>
                            )}
                            {post?.slug ? (
                                <Link href={`/blog/${post.slug}`}>
                                  <Button variant="ghost" size="sm" className="text-orange-600 hover:text-orange-700 hover:bg-orange-50">
                                    Read More <ArrowRight className="w-4 h-4 ml-1" />
                                  </Button>
                                </Link>
                            ) : (
                                <Button variant="ghost" size="sm" className="text-orange-600 hover:text-orange-700 hover:bg-orange-50" disabled>
                                  Read More <ArrowRight className="w-4 h-4 ml-1" />
                                </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                  ))}
                </div>
              </div>
              
              {/* Load More */}
              {hasMorePosts && (
                <div className="text-center">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="border-orange-200 text-orange-600 hover:bg-orange-50"
                    onClick={loadMore}
                    disabled={loading}
                  >
                    {loading ? 'Loading...' : 'Load More Articles'}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              )}
              
              {!hasMorePosts && allOtherPosts.length > 6 && (
                <div className="text-center text-gray-500">
                  <p>All articles loaded</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Newsletter Signup */}
          <>
            <div className="py-20 bg-gradient-to-r from-orange-600 to-yellow-500">
              <div className="max-w-4xl mx-auto px-6 text-center">
                <h2 className="text-4xl font-bold text-white mb-6">
                  Stay Updated with Solar News
                </h2>
                <p className="text-xl text-orange-100 mb-8">
                  Get the latest solar industry insights, policy updates, and installation tips delivered to your inbox
                </p>
                <div className="flex max-w-md mx-auto">
                  <input
                      type="email"
                      placeholder="Enter your email address"
                      className="flex-1 px-4 py-3 rounded-l-lg border-0 text-gray-900"
                  />
                  <Button className="bg-white text-orange-600 hover:bg-gray-100 px-6 py-3 rounded-r-lg">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
          </>
        </div>
      </Layout>
  );
}

export async function getServerSideProps() {
  try {
    // Try different endpoints to find blog content
    let resp;
    try {
      // Try blogs endpoint first with working populate pattern
      resp = await axios.get(`${strapiBasePath}/blogs?populate=*`, strapiConfig);
    } catch (error) {
      try {
        // Try posts endpoint with working populate pattern
        resp = await axios.get(`${strapiBasePath}/posts?populate=*`, strapiConfig);
      } catch (error2) {
        try {
          // Try articles endpoint with working populate pattern
          resp = await axios.get(`${strapiBasePath}/articles?populate=*`, strapiConfig);
        } catch (error3) {
          // Fall back to webpages with working populate pattern
          resp = await axios.get(`${strapiBasePath}/webpages?populate=*`, strapiConfig);
        }
      }
    }
    
    return {
      props: {
        blogs: resp.data,
      },
    };
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return {
      props: {
        blogs: [],
      },
    };
  }
}

