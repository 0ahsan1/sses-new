import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp, Battery, Grid3X3, Zap, Sun, Home, Building, Factory, Sprout } from "lucide-react";
import Layout from "@/components/Layout";
import {queryObjectBuilder} from "@/lib/utils";
import axios from "axios";
import {strapiBasePath, strapiConfig} from "@/services/ApiService";

export default function Services() {
  const [expandedService, setExpandedService] = useState(null);

  const services = [
    {
      id: "off-grid",
      title: "Off-Grid Solar Systems",
      icon: Battery,
      subtitle: "Complete energy independence with battery backup",
      price: "From ₨8,00,000",
      features: [
        "24/7 power availability",
        "Battery backup storage",
        "No electricity bills",
        "Perfect for remote areas",
        "Expandable system design"
      ],
      applications: ["Rural homes", "Farms", "Remote offices", "Cabins"],
      components: [
        "High-efficiency solar panels",
        "Deep-cycle batteries (Lithium/AGM)",
        "MPPT charge controllers", 
        "Pure sine wave inverters",
        "Monitoring system"
      ],
      color: "from-green-500 to-emerald-600"
    },
    {
      id: "on-grid",
      title: "On-Grid Solar Systems", 
      icon: Grid3X3,
      subtitle: "Grid-tied systems with net metering benefits",
      price: "From ₨6,00,000",
      features: [
        "Net metering compatibility",
        "Sell excess power back to grid",
        "Lower upfront costs",
        "Grid backup when needed",
        "Maximum cost savings"
      ],
      applications: ["Urban homes", "Commercial buildings", "Offices", "Shops"],
      components: [
        "Tier-1 solar panels",
        "Grid-tie inverters",
        "Net metering equipment",
        "AC/DC isolators",
        "Monitoring portal"
      ],
      color: "from-blue-500 to-cyan-600"
    },
    {
      id: "hybrid",
      title: "Hybrid Solar Systems",
      icon: Zap,
      subtitle: "Best of both worlds - grid connection + battery backup",
      price: "From ₨12,00,000",
      features: [
        "Grid-tie + battery backup",
        "Uninterrupted power supply",
        "Smart energy management",
        "Load shedding protection",
        "Optimized energy usage"
      ],
      applications: ["Premium homes", "Hospitals", "Data centers", "Critical facilities"],
      components: [
        "Premium solar panels",
        "Hybrid inverters",
        "Lithium battery banks",
        "Smart energy management",
        "Remote monitoring"
      ],
      color: "from-purple-500 to-pink-600"
    }
  ];

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

  return (
      <Layout>
        <div className="min-h-screen bg-gray-50">
          {/* Hero Section */}
          <div className="bg-gradient-to-br from-slate-900 to-blue-900 py-20">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Solar Solutions for Every Need
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                From residential rooftops to industrial complexes, we have the perfect solar solution for you
              </p>
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
                Get Custom Quote
              </Button>
            </div>
          </div>
          
          {/* Main Services */}
          <div className="py-20">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Choose Your Solar System Type
                </h2>
                <p className="text-xl text-gray-600">
                  Each system type is designed for different needs and budgets
                </p>
              </div>
              
              <div className="grid gap-8">
                {services.map((service, index) => (
                    <Card key={service.id} className="overflow-hidden shadow-lg border-0">
                      <div className={`bg-gradient-to-r ${service.color} p-6`}>
                        <div className="flex items-center justify-between text-white">
                          <div className="flex items-center">
                            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                              <service.icon className="w-7 h-7" />
                            </div>
                            <div>
                              <h3 className="text-2xl font-bold">{service.title}</h3>
                              <p className="text-white/90">{service.subtitle}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold">{service.price}</div>
                            <Button
                                variant="outline"
                                className="mt-2 border-white/30 text-white hover:bg-white/10"
                                onClick={() => setExpandedService(expandedService === service.id ? null : service.id)}
                            >
                              {expandedService === service.id ? (
                                  <>Less Info <ChevronUp className="w-4 h-4 ml-2" /></>
                              ) : (
                                  <>More Info <ChevronDown className="w-4 h-4 ml-2" /></>
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      {expandedService === service.id && (
                          <CardContent className="p-8">
                            <div className="grid md:grid-cols-3 gap-8">
                              <div>
                                <h4 className="font-bold text-lg text-gray-900 mb-4">Key Benefits</h4>
                                <ul className="space-y-2">
                                  {service.features.map((feature, idx) => (
                                      <li key={idx} className="flex items-center text-gray-700">
                                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                                        {feature}
                                      </li>
                                  ))}
                                </ul>
                              </div>
                              
                              <div>
                                <h4 className="font-bold text-lg text-gray-900 mb-4">Best For</h4>
                                <div className="space-y-2">
                                  {service.applications.map((app, idx) => (
                                      <Badge key={idx} variant="secondary" className="mr-2 mb-2">
                                        {app}
                                      </Badge>
                                  ))}
                                </div>
                              </div>
                              
                              <div>
                                <h4 className="font-bold text-lg text-gray-900 mb-4">Components</h4>
                                <ul className="space-y-2">
                                  {service.components.map((component, idx) => (
                                      <li key={idx} className="text-gray-700 text-sm">
                                        • {component}
                                      </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                            
                            <div className="mt-8 pt-6 border-t border-gray-200">
                              <div className="flex justify-between items-center">
                                <div>
                                  <h4 className="font-bold text-lg text-gray-900">Ready to get started?</h4>
                                  <p className="text-gray-600">Get a customized quote for your {service.title.toLowerCase()}</p>
                                </div>
                                <Button className="bg-orange-600 hover:bg-orange-700">
                                  Get Quote for {service.title}
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                      )}
                    </Card>
                ))}
              </div>
            </div>
          </div>
          
          {/* Sector Services */}
          <div className="py-20 bg-white">
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
    
    console.log("Strapi meta:", resp?.meta);
    console.log("Found page id:", pageEntry?.id);
    
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