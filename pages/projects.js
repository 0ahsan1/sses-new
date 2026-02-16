import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Zap, Calendar, Users, Filter } from "lucide-react";
import Layout from "@/components/Layout";
import {queryObjectBuilder} from "@/lib/utils";
import axios from "axios";
import {strapiBasePath, strapiConfig} from "@/services/ApiService";
import qs from "qs";
import HeroSection from "@/components/home/HeroSection";
import Link from "next/link";

export default function Projects({data}) {
  const [activeFilter, setActiveFilter] = useState("all");
  // const projects = [
  //   {
  //     id: 1,
  //     title: "Luxury Villa Solar System",
  //     image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=600",
  //     location: "DHA Phase 8, Karachi",
  //     capacity: "15kW",
  //     type: "residential",
  //     savings: "₨25,000/month",
  //     date: "December 2024",
  //     client: "Mr. Ahmed Khan",
  //     description: "Complete off-grid solar solution with Tesla Powerwall equivalent battery system for a luxury home.",
  //     testimonial: "SolarPak transformed our home into an energy-independent paradise. Zero electricity bills!"
  //   },
  //   {
  //     id: 2,
  //     title: "Commercial Office Building",
  //     image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600",
  //     location: "Gulshan-e-Iqbal, Karachi",
  //     capacity: "75kW",
  //     type: "commercial",
  //     savings: "₨1,20,000/month",
  //     date: "November 2024",
  //     client: "TechCorp Solutions",
  //     description: "Net-metering enabled rooftop installation reducing operational costs by 85%.",
  //     testimonial: "Professional installation and excellent after-sales support. Highly recommended!"
  //   },
  //   {
  //     id: 3,
  //     title: "Textile Manufacturing Plant",
  //     image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=600",
  //     location: "SITE Industrial Area",
  //     capacity: "500kW",
  //     type: "industrial",
  //     savings: "₨5,00,000/month",
  //     date: "October 2024",
  //     client: "Karachi Textiles Ltd",
  //     description: "Large-scale hybrid solar system providing 60% of total energy requirements.",
  //     testimonial: "Significant reduction in operational costs. ROI achieved in just 3 years."
  //   },
  //   {
  //     id: 4,
  //     title: "Farm Solar Water Pumping",
  //     image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600",
  //     location: "Thatta District",
  //     capacity: "20kW",
  //     type: "agricultural",
  //     savings: "₨30,000/month",
  //     date: "September 2024",
  //     client: "Malik Farm House",
  //     description: "Solar-powered irrigation system covering 50 acres of agricultural land.",
  //     testimonial: "Revolutionary change for our farming operations. Reliable and cost-effective."
  //   },
  //   {
  //     id: 5,
  //     title: "Shopping Mall Solar Installation",
  //     image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600",
  //     location: "Clifton, Karachi",
  //     capacity: "200kW",
  //     type: "commercial",
  //     savings: "₨3,50,000/month",
  //     date: "August 2024",
  //     client: "Ocean Mall",
  //     description: "Hybrid system ensuring uninterrupted power supply during peak shopping hours.",
  //     testimonial: "Zero downtime during load shedding. Customers and tenants are extremely happy."
  //   },
  //   {
  //     id: 6,
  //     title: "Residential Community Project",
  //     image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=600",
  //     location: "Bahria Town, Karachi",
  //     capacity: "250kW",
  //     type: "residential",
  //     savings: "₨4,00,000/month",
  //     date: "July 2024",
  //     client: "Bahria Residents Society",
  //     description: "Community-wide solar installation serving 50 houses with shared grid-tie system.",
  //     testimonial: "Community-wide savings and environmental impact. Excellent project management."
  //   }
  // ];
const projectSection = data.project_section;
const projects = projectSection.projects;
  const filterButtons = [
    { key: "all", label: "All Projects", count: projects.length },
    { key: "residential", label: "Residential", count: projects.filter(p => p.type === "residential").length },
    { key: "commercial", label: "Commercial", count: projects.filter(p => p.type === "commercial").length }, 
    { key: "industrial", label: "Industrial", count: projects.filter(p => p.type === "industrial").length },
    { key: "agricultural", label: "Agricultural", count: projects.filter(p => p.type === "agricultural").length }
  ];

  const filteredProjects = activeFilter === "all" 
    ? projects 
    : projects.filter(project => project.type === activeFilter);

  const getTypeColor = (type) => {
    const colors = {
      residential: "bg-blue-100 text-blue-800",
      commercial: "bg-green-100 text-green-800", 
      industrial: "bg-purple-100 text-purple-800",
      agricultural: "bg-orange-100 text-orange-800"
    };
    return colors[type];
  };

  return (
      <Layout>
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
	    <HeroSection banner={data.banner} />
	    
	    {/* Filter Section */}
      <div className="py-12 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            {/*<div className="flex items-center">*/}
            {/*  <Filter className="w-5 h-5 text-gray-500 mr-3" />*/}
            {/*  <h2 className="text-xl font-semibold text-gray-900">Filter Projects</h2>*/}
            {/*</div>*/}
            {/*<div className="flex flex-wrap gap-3">*/}
            {/*  {filterButtons.map((filter) => (*/}
            {/*    <Button*/}
            {/*      key={filter.key}*/}
            {/*      variant={activeFilter === filter.key ? "default" : "outline"}*/}
            {/*      className={activeFilter === filter.key ? "bg-orange-600 hover:bg-orange-700" : ""}*/}
            {/*      onClick={() => setActiveFilter(filter.key)}*/}
            {/*    >*/}
            {/*      {filter.label} ({filter.count})*/}
            {/*    </Button>*/}
            {/*  ))}*/}
            {/*</div>*/}
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Card key={project.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300 border-0 shadow-lg">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <Link href={`/project-details/${project.slug}`} >
                    <img
                        src={project.image ? 'https://dev-content.sses.pk' + project.image[0]?.url : '#'}
                        alt={project.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                    />
                  </Link>
                  <div className="absolute top-4 left-4 ">
	                 <span className={'font-bold text-[8px] p-1 bg-white'}>
                        {project.info.category}
                     </span>
                  </div>
                
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    <Link href={`/project-details/${project.slug}`} >
                    {project.title}
                    </Link>
                  </h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span className="text-sm">{project.info.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span className="text-sm">{project.info.date}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users className="w-4 h-4 mr-2" />
                      <span className="text-sm">{project.info.customer}</span>
                    </div>
                  </div>

                  <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                    {/*{project.description}*/}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/*{filteredProjects.length === 0 && (*/}
          {/*  <div className="text-center py-20">*/}
          {/*    <Zap className="w-16 h-16 text-gray-300 mx-auto mb-6" />*/}
          {/*    <h3 className="text-2xl font-bold text-gray-900 mb-4">*/}
          {/*      No projects found*/}
          {/*    </h3>*/}
          {/*    <p className="text-gray-600">*/}
          {/*      Try adjusting your filter selection*/}
          {/*    </p>*/}
          {/*  </div>*/}
          {/*)}*/}
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-orange-600 to-yellow-500">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Join Our Success Stories?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Get a custom solar solution designed specifically for your property
          </p>
          <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
            Start Your Solar Journey
          </Button>
        </div>
      </div>
    </div>
      </Layout>
  );
}

export async function getServerSideProps() {
  const queryObject = queryObjectBuilder("projects")
  
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