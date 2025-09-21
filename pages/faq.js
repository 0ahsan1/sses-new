import React, { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";

export default function FAQ() {
  const [expandedItems, setExpandedItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const faqCategories = [
    {
      title: "General Information",
      items: [
        {
          question: "How does solar energy work in Pakistan's climate?",
          answer: "Pakistan receives excellent solar irradiation (4.5-6.5 kWh/m²/day) throughout the year, making it ideal for solar energy generation. Our systems are specifically designed to withstand high temperatures, dust, and humidity common in Pakistani weather conditions."
        },
        {
          question: "What are the different types of solar systems available?",
          answer: "We offer three main types: 1) On-Grid systems (connected to utility grid with net metering), 2) Off-Grid systems (with battery backup for complete independence), and 3) Hybrid systems (combining both grid-tie and battery backup features)."
        },
        {
          question: "How much can I save on my electricity bills?",
          answer: "Most customers save 70-90% on their electricity bills. With our solar systems, a typical household paying ₨20,000/month can reduce their bill to ₨2,000-5,000/month, depending on system size and usage patterns."
        }
      ]
    },
    {
      title: "Installation & Process",
      items: [
        {
          question: "How long does the installation process take?",
          answer: "Residential installations (up to 20kW) typically take 1-3 days. Commercial installations may take 5-10 days depending on complexity. We handle all paperwork, permissions, and net metering applications for you."
        },
        {
          question: "Do you provide free site surveys?",
          answer: "Yes, we offer completely free site surveys and system design consultations. Our certified engineers will assess your roof space, electrical requirements, and energy consumption to design the optimal system for your needs."
        },
        {
          question: "What permits and approvals are needed?",
          answer: "We handle all necessary permits including: building permissions, net metering applications with K-Electric/LESCO/other DISCOs, and safety certifications. Our team manages the entire approval process."
        }
      ]
    },
    {
      title: "Costs & Financing",
      items: [
        {
          question: "What is the cost per kW for solar installation in Pakistan?",
          answer: "Solar system costs range from ₨80,000-150,000 per kW installed, depending on system type and components. This includes panels, inverters, mounting, installation, and commissioning. We offer the most competitive rates in the market."
        },
        {
          question: "Do you offer financing or payment plans?",
          answer: "Yes, we offer flexible financing options including: zero down payment plans, installment options up to 5 years, and partnerships with leading banks for solar loans at competitive interest rates."
        },
        {
          question: "What is the payback period for solar investment?",
          answer: "Most residential systems pay for themselves in 3-5 years through electricity savings. With rising utility costs and our 25-year warranty, total savings over the system lifetime can exceed ₨30-50 lakhs."
        }
      ]
    },
    {
      title: "Technical & Maintenance",
      items: [
        {
          question: "What warranty do you provide on solar systems?",
          answer: "We provide comprehensive warranties: 25 years performance warranty on solar panels, 5-10 years on inverters, 2 years on installation workmanship, and lifetime technical support."
        },
        {
          question: "How much maintenance do solar panels require?",
          answer: "Solar panels require minimal maintenance. We recommend quarterly cleaning (especially in dusty areas like Karachi) and annual system inspection. We provide free maintenance for the first 2 years."
        },
        {
          question: "What happens during load shedding or power outages?",
          answer: "On-grid systems shut down during outages for safety. Off-grid and hybrid systems with batteries continue providing power during outages. Hybrid systems offer the best of both worlds - grid savings plus backup power."
        }
      ]
    },
    {
      title: "Net Metering & Grid Connection",
      items: [
        {
          question: "How does net metering work in Pakistan?",
          answer: "Net metering allows you to sell excess solar electricity back to the grid. During sunny hours, your system generates power and feeds surplus to the grid. You get credits that offset your nighttime consumption, dramatically reducing your bills."
        },
        {
          question: "Which areas in Pakistan support net metering?",
          answer: "Net metering is available across Pakistan through all major DISCOs including K-Electric (Karachi), LESCO (Lahore), IESCO (Islamabad), MEPCO (Multan), and others. Each has slightly different procedures which we handle for you."
        }
      ]
    }
  ];

  const toggleExpand = (categoryIndex, itemIndex) => {
    const key = `${categoryIndex}-${itemIndex}`;
    setExpandedItems(prev => 
      prev.includes(key) 
        ? prev.filter(item => item !== key)
        : [...prev, key]
    );
  };

  const isExpanded = (categoryIndex, itemIndex) => {
    return expandedItems.includes(`${categoryIndex}-${itemIndex}`);
  };

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    items: category.items.filter(item => 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.items.length > 0);

  return (
      <Layout>
        <div className="min-h-screen bg-gray-50">
          {/* Hero Section */}
          <div className="bg-gradient-to-br from-slate-900 to-blue-900 py-20">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <HelpCircle className="w-20 h-20 text-orange-400 mx-auto mb-6" />
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Frequently Asked Questions
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Everything you need to know about solar energy in Pakistan
              </p>
              
              {/* Search Bar */}
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                    type="text"
                    placeholder="Search for answers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 pr-4 py-4 text-lg rounded-xl border-0 shadow-lg"
                />
              </div>
            </div>
          </div>
          
          {/* FAQ Content */}
          <div className="py-20">
            <div className="max-w-4xl mx-auto px-6">
              {searchQuery && (
                  <div className="mb-8 text-center">
                    <p className="text-gray-600">
                      Showing results for: <span className="font-semibold">"{searchQuery}"</span>
                    </p>
                  </div>
              )}
              
              <div className="space-y-8">
                {filteredCategories.map((category, categoryIndex) => (
                    <div key={categoryIndex}>
                      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                        <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                          <div className="w-4 h-4 bg-orange-500 rounded-full" />
                        </div>
                        {category.title}
                      </h2>
                      
                      <div className="space-y-4">
                        {category.items.map((item, itemIndex) => (
                            <Card key={itemIndex} className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
                              <CardContent className="p-0">
                                <button
                                    className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                                    onClick={() => toggleExpand(categoryIndex, itemIndex)}
                                >
                                  <h3 className="text-lg font-semibold text-gray-900 pr-4">
                                    {item.question}
                                  </h3>
                                  {isExpanded(categoryIndex, itemIndex) ? (
                                      <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                                  ) : (
                                      <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                                  )}
                                </button>
                                
                                {isExpanded(categoryIndex, itemIndex) && (
                                    <div className="px-6 pb-6">
                                      <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                                        <p className="text-gray-700 leading-relaxed">
                                          {item.answer}
                                        </p>
                                      </div>
                                    </div>
                                )}
                              </CardContent>
                            </Card>
                        ))}
                      </div>
                    </div>
                ))}
              </div>
              
              {filteredCategories.length === 0 && (
                  <div className="text-center py-20">
                    <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-6" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      No results found
                    </h3>
                    <p className="text-gray-600 mb-6">
                      We couldn't find any FAQs matching your search. Try different keywords or browse our categories above.
                    </p>
                    <Button
                        variant="outline"
                        onClick={() => setSearchQuery("")}
                        className="border-orange-200 text-orange-600 hover:bg-orange-50"
                    >
                      Clear Search
                    </Button>
                  </div>
              )}
            </div>
          </div>
          
          {/* Contact CTA */}
          <div className="py-20 bg-gradient-to-r from-orange-600 to-yellow-500">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <h2 className="text-4xl font-bold text-white mb-6">
                Still Have Questions?
              </h2>
              <p className="text-xl text-orange-100 mb-8">
                Our solar experts are here to help. Get personalized answers for your specific needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
                  Schedule Free Consultation
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Call: +92 321 1234567
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
  );
}