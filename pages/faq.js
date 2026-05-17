import React, { useState } from "react";
import {ChevronDown, ChevronUp, HelpCircle, Mail, Phone, Search} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import {queryObjectBuilder} from "@/lib/utils";
import axios from "axios";
import {strapiBasePath, strapiConfig} from "@/services/ApiService";
import qs from "qs";

export default function FAQ({data}) {
  const [expandedItems, setExpandedItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const faqItems = data?.faq?.items || [];

  const toggleExpand = (itemIndex) => {
    setExpandedItems(prev => 
      prev.includes(itemIndex) 
        ? prev.filter(item => item !== itemIndex)
        : [...prev, itemIndex]
    );
  };

  const isExpanded = (itemIndex) => {
    return expandedItems.includes(itemIndex);
  };

  const filteredItems = faqItems.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
      <Layout>
        <div className="min-h-screen bg-gray-50">
          {/* Hero Section */}
          <div className="bg-gradient-to-br from-slate-900 to-blue-900 py-20">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <HelpCircle className="w-20 h-20 text-orange-400 mx-auto mb-6" />
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                {data?.banner?.title || "Frequently Asked Questions1"}
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                {data?.banner?.description || "Everything you need to know about solar energy in Pakistan"}
              </p>
              
              {/* Search Bar */}
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                    type="text"
                    placeholder="Search for answers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 pr-4 py-4 text-lg rounded-xl border-0 shadow-lg text-white"
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
              
              <div className="space-y-4">
                {filteredItems.map((item, itemIndex) => (
                    <Card key={itemIndex} className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
                      <CardContent className="p-0">
                        <button
                            className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                            onClick={() => toggleExpand(itemIndex)}
                        >
                          <h3 className="text-lg font-semibold text-gray-900 pr-4">
                            {item.title}
                          </h3>
                          {isExpanded(itemIndex) ? (
                              <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                          ) : (
                              <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                          )}
                        </button>
                        
                        {isExpanded(itemIndex) && (
                            <div className="px-6 pb-6">
                              <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                                <div className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: item.description }} />
                              </div>
                            </div>
                        )}
                      </CardContent>
                    </Card>
                ))}
              </div>
              
              {filteredItems.length === 0 && (
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
                  <a href="/contact">
                    Schedule Free Consultation
                  </a>
                </Button>
                <Button size="lg" className="w-50 bg-white text-orange-600 hover:bg-orange-50" asChild>
                  <a href="tel:+923018207730">
                    <Phone className="mr-2 h-4 w-4" />
                    Call Now
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
  );
}

export async function getServerSideProps() {
	const queryObject = queryObjectBuilder("faq-page")
	
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