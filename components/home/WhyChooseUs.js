import React from "react";
import { Shield, Award, Users, Clock, Wrench, DollarSign } from "lucide-react";

const iconMap = {
  Shield,
  Award,
  Users,
  Clock,
  Wrench,
  DollarSign
};

export default function WhyChooseUs({ home6 }) {
  console.log('WhyChooseUs',home6);
  // Default features in case home6 data is not provided
  const defaultFeatures = [
    {
      icon: "Shield",
      title: "25-Year Warranty",
      description: "Industry-leading performance warranty on all solar panels and inverters",
      color: "text-green-600"
    },
    {
      icon: "Award",
      title: "Certified Excellence", 
      description: "ISO certified with Tier-1 international solar components",
      color: "text-blue-600"
    },
    {
     
      icon: "DollarSign",
      title: "Expert Team",
      description: "Certified engineers with 10+ years of solar installation experience",
      color: "text-purple-600"
    },
    {
      icon: "Clock",
      title: "Quick Installation",
      description: "Professional installation completed within 1-3 days",
      color: "text-orange-600"
    },
    {
      icon: "Wrench",
      title: "Free Maintenance",
      description: "Complimentary system maintenance for the first 2 years",
      color: "text-red-600"
    },
    {
      icon: "Users",
      title: "Best Prices",
      description: "Most competitive rates in Pakistan with flexible payment options",
      color: "text-green-600"
    }
  ];

  // Use home6 data if available, otherwise use default features
  const features = home6?.items?.length > 0
    ? home6.items.map(feature => ({
        ...feature,
        icon: iconMap[feature.icon] || Shield
      }))
    : defaultFeatures;

  // Get stats from home6 or use defaults
  const stats = home6?.stats?.length > 0 ? home6.stats : [
    { value: "2000+", label: "Happy Customers", color: "text-orange-400" },
    { value: "50MW+", label: "Installed Capacity", color: "text-green-400" },
    { value: "99.5%", label: "System Uptime", color: "text-blue-400" },
    { value: "5★", label: "Customer Rating", color: "text-purple-400" }
  ];

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {home6?.title || "Why Choose SolarPak?"}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {home6?.subtitle || "We're Pakistan's most trusted solar installation company, delivering premium quality systems with unmatched customer service and support."}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent =  iconMap[defaultFeatures[index].icon]
            return (
              <div
                key={index}
                className="group p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-orange-100"
              >
                <div className={`w-16 h-16 ${feature.color || 'text-orange-500'} bg-opacity-10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className={`w-8 h-8 ${feature.color || 'text-orange-500'}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-gradient-to-r from-gray-900 to-blue-900 rounded-3xl p-12 text-white">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className={`text-4xl font-bold ${stat.color} mb-2`}>
                  {stat.value}
                </div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}