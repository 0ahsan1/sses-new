import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";

export default function Blog() {
  const featuredPost = {
    id: 1,
    title: "Pakistan's Solar Revolution: Government Incentives and Net Metering Policy 2024",
    excerpt: "Complete guide to Pakistan's new net metering policies, tax benefits, and government incentives for solar installations.",
    image: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=800",
    category: "Policy Updates",
    author: "Solar Expert Team",
    date: "December 15, 2024",
    readTime: "8 min read",
    featured: true
  };

  const blogPosts = [
    {
      id: 2,
      title: "Solar Panel Efficiency in Pakistan's Climate: Complete Analysis",
      excerpt: "How different solar panel technologies perform in Pakistan's hot and humid climate conditions.",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400",
      category: "Technology",
      author: "Dr. Ahmad Hassan",
      date: "December 10, 2024",
      readTime: "5 min read"
    },
    {
      id: 3,
      title: "ROI Calculator: Solar Investment Returns in Major Pakistani Cities",
      excerpt: "Detailed cost-benefit analysis of solar installations in Karachi, Lahore, Islamabad, and other cities.",
      image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400",
      category: "Cost Analysis",
      author: "Finance Team",
      date: "December 8, 2024", 
      readTime: "6 min read"
    },
    {
      id: 4,
      title: "Industrial Solar Solutions: Case Study from Karachi Textile Sector",
      excerpt: "How textile manufacturers in Karachi are reducing operational costs by 70% with solar energy.",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400",
      category: "Case Studies",
      author: "Industrial Team",
      date: "December 5, 2024",
      readTime: "10 min read"
    },
    {
      id: 5,
      title: "Residential Solar Maintenance: Karachi Weather Challenges",
      excerpt: "Essential maintenance tips for solar panels in coastal areas prone to dust and humidity.",
      image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=400",
      category: "Maintenance",
      author: "Technical Team",
      date: "December 3, 2024",
      readTime: "4 min read"
    },
    {
      id: 6,
      title: "Agricultural Solar Pumping: Success Stories from Sindh Province",
      excerpt: "How farmers are revolutionizing irrigation with solar-powered water pumping systems.",
      image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400",
      category: "Agriculture",
      author: "Agri Solar Team", 
      date: "November 30, 2024",
      readTime: "7 min read"
    },
    {
      id: 7,
      title: "Battery Storage vs Grid-Tie: Which System is Right for You?",
      excerpt: "Comprehensive comparison of different solar system types for Pakistani households.",
      image: "https://images.unsplash.com/photo-1558618666-fbd19c4cd1ce?w=400",
      category: "Technology",
      author: "System Design Team",
      date: "November 28, 2024",
      readTime: "8 min read"
    }
  ];

  const categories = [
    "All Posts", "Policy Updates", "Technology", "Cost Analysis", 
    "Case Studies", "Maintenance", "Agriculture", "Installation Tips"
  ];

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
                    <img
                        src={featuredPost.image}
                        alt={featuredPost.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute top-6 left-6">
                      <Badge className="bg-orange-600 text-white text-sm px-3 py-1">
                        Featured Article
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-8 lg:p-12 flex flex-col justify-center">
                    <Badge className={`w-fit mb-4 ${getCategoryColor(featuredPost.category)}`}>
                      {featuredPost.category}
                    </Badge>
                    
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                      {featuredPost.title}
                    </h2>
                    
                    <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                      {featuredPost.excerpt}
                    </p>
                    
                    <div className="flex items-center text-gray-500 mb-6 space-x-4">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-2" />
                        <span className="text-sm">{featuredPost.author}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span className="text-sm">{featuredPost.date}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        <span className="text-sm">{featuredPost.readTime}</span>
                      </div>
                    </div>
                    
                    <Button className="bg-orange-600 hover:bg-orange-700 w-fit">
                      Read Full Article
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </div>
              </Card>
              
              {/* Recent Posts Grid */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                  Latest Articles
                </h2>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {blogPosts.map((post) => (
                      <Card key={post.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300 border-0 shadow-lg">
                        <div className="aspect-[4/3] relative overflow-hidden">
                          <img
                              src={post.image}
                              alt={post.title}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        
                        <CardContent className="p-6">
                          <Badge className={`mb-3 ${getCategoryColor(post.category)}`}>
                            {post.category}
                          </Badge>
                          
                          <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight hover:text-orange-600 transition-colors cursor-pointer">
                            {post.title}
                          </h3>
                          
                          <p className="text-gray-600 mb-4 line-clamp-3">
                            {post.excerpt}
                          </p>
                          
                          <div className="flex items-center justify-between text-gray-500 text-sm mb-4">
                            <div className="flex items-center">
                              <User className="w-4 h-4 mr-1" />
                              <span>{post.author}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              <span>{post.readTime}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-gray-500 text-sm">
                              <Calendar className="w-4 h-4 mr-1" />
                              <span>{post.date}</span>
                            </div>
                            <Button variant="ghost" size="sm" className="text-orange-600 hover:text-orange-700 hover:bg-orange-50">
                              Read More <ArrowRight className="w-4 h-4 ml-1" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                  ))}
                </div>
              </div>
              
              {/* Load More */}
              <div className="text-center">
                <Button variant="outline" size="lg" className="border-orange-200 text-orange-600 hover:bg-orange-50">
                  Load More Articles
                </Button>
              </div>
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

