import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Send,
  Loader2,
} from "lucide-react";
import Layout from "@/components/Layout";

const initialFormData = {
  name: "",
  email: "",
  phone: "",
  address: "",
  propertyType: "",
  monthlyBill: "",
  message: "",
};

export default function Contact() {
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setStatusMessage("");
    setStatusType("");
    
    try {
      setIsSubmitting(true);
      
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || "Something went wrong.");
      }
      
      setStatusType("success");
      setStatusMessage(
          "Thank you! Your request has been submitted successfully. A confirmation email has been sent to you."
      );
      
      setFormData(initialFormData);
    } catch (error) {
      console.error("Contact form error:", error);
      
      setStatusType("error");
      setStatusMessage(
          error.message || "Sorry, your request could not be submitted. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  
  const contactInfo = [
    {
      icon: MapPin,
      title: "Head Office",
      content: "Plot 123, Block 5, Clifton, Karachi, Pakistan",
      color: "text-blue-600",
    },
    {
      icon: Phone,
      title: "Phone Numbers",
      content: "+92 321 1234567\n+92 21 34567890",
      color: "text-green-600",
    },
    {
      icon: Mail,
      title: "Email Address",
      content: "info.sustainablesolar@gmail.com",
      color: "text-purple-600",
    },
    {
      icon: Clock,
      title: "Business Hours",
      content: "Mon - Sat: 9:00 AM - 7:00 PM\nSunday: 10:00 AM - 5:00 PM",
      color: "text-orange-600",
    },
  ];
  
  const serviceAreas = [
    "Karachi",
    "Lahore",
    "Islamabad",
    "Rawalpindi",
    "Faisalabad",
    "Multan",
    "Hyderabad",
    "Peshawar",
    "Quetta",
    "Gujranwala",
  ];
  
  return (
      <Layout>
        <div className="min-h-screen bg-gray-50">
          {/* Hero Section */}
          <div className="bg-gradient-to-br from-slate-900 to-blue-900 py-20">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Get In Touch
              </h1>
              
              <p className="text-xl text-gray-300 mb-8">
                Ready to switch to solar? Our experts are here to help you every
                step of the way.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 text-white">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-400">
                    24 Hours
                  </div>
                  <div className="text-gray-300">Response Time</div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">Free</div>
                  <div className="text-gray-300">Site Survey</div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">
                    No Obligation
                  </div>
                  <div className="text-gray-300">Consultation</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="py-20">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid lg:grid-cols-3 gap-12">
                {/* Contact Form */}
                <div className="lg:col-span-2">
                  <Card className="shadow-xl border-0">
                    <CardHeader className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-3xl">
                      <CardTitle className="text-2xl flex items-center p-4">
                        <Send className="w-6 h-6 mr-3" />
                        Request Free Solar Consultation
                      </CardTitle>
                      
                      <p className="text-orange-100">
                        Fill out this form and our solar experts will contact you
                        within 24 hours.
                      </p>
                    </CardHeader>
                    
                    <CardContent className="p-8">
                      <form onSubmit={handleSubmit} className="space-y-6">
                        {statusMessage && (
                            <div
                                className={`p-4 rounded-lg border text-sm ${
                                    statusType === "success"
                                        ? "bg-green-50 border-green-200 text-green-700"
                                        : "bg-red-50 border-red-200 text-red-700"
                                }`}
                            >
                              {statusMessage}
                            </div>
                        )}
                        
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Full Name *
                            </label>
                            
                            <Input
                                required
                                value={formData.name}
                                onChange={(e) =>
                                    handleInputChange("name", e.target.value)
                                }
                                placeholder="Enter your full name"
                                className="text-lg"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Phone Number *
                            </label>
                            
                            <Input
                                required
                                type="tel"
                                value={formData.phone}
                                onChange={(e) =>
                                    handleInputChange("phone", e.target.value)
                                }
                                placeholder="+92 300 1234567"
                                className="text-lg"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address *
                          </label>
                          
                          <Input
                              required
                              type="email"
                              value={formData.email}
                              onChange={(e) =>
                                  handleInputChange("email", e.target.value)
                              }
                              placeholder="your.email@example.com"
                              className="text-lg"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Property Address
                          </label>
                          
                          <Input
                              value={formData.address}
                              onChange={(e) =>
                                  handleInputChange("address", e.target.value)
                              }
                              placeholder="Street address, city, area"
                              className="text-lg"
                          />
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Property Type
                            </label>
                            
                            <Select
                                value={formData.propertyType}
                                onValueChange={(value) =>
                                    handleInputChange("propertyType", value)
                                }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select property type" />
                              </SelectTrigger>
                              
                              <SelectContent>
                                <SelectItem value="residential">
                                  Residential House
                                </SelectItem>
                                <SelectItem value="commercial">
                                  Commercial Building
                                </SelectItem>
                                <SelectItem value="industrial">
                                  Industrial Facility
                                </SelectItem>
                                <SelectItem value="agricultural">
                                  Agricultural/Farm
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Monthly Electricity Bill (PKR)
                            </label>
                            
                            <Input
                                type="number"
                                value={formData.monthlyBill}
                                onChange={(e) =>
                                    handleInputChange("monthlyBill", e.target.value)
                                }
                                placeholder="e.g., 15000"
                                className="text-lg"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Additional Message
                          </label>
                          
                          <Textarea
                              value={formData.message}
                              onChange={(e) =>
                                  handleInputChange("message", e.target.value)
                              }
                              placeholder="Tell us about your solar requirements, questions, or concerns..."
                              className="h-32"
                          />
                        </div>
                        
                        <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                          <h4 className="font-semibold text-orange-800 mb-2">
                            What happens next?
                          </h4>
                          
                          <ul className="text-sm text-orange-700 space-y-1">
                            <li>
                              • Our solar consultant will call you within 24 hours
                            </li>
                            <li>• Free site survey and energy assessment</li>
                            <li>
                              • Customized solar system proposal with pricing
                            </li>
                            <li>
                              • No obligation - completely free consultation
                            </li>
                          </ul>
                        </div>
                        
                        <Button
                            type="submit"
                            size="lg"
                            disabled={isSubmitting}
                            className="w-full bg-orange-600 hover:bg-orange-700 text-lg py-4 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? (
                              <>
                                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                Sending Request...
                              </>
                          ) : (
                              <>
                                <Send className="w-5 h-5 mr-2" />
                                Send My Request
                              </>
                          )}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Contact Information */}
                <div className="space-y-8">
                  <div className="space-y-6">
                    {contactInfo.map((info, index) => (
                        <Card
                            key={index}
                            className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300"
                        >
                          <CardContent className="p-6">
                            <div className="flex items-start">
                              <div
                                  className={`w-12 h-12 ${info.color} bg-opacity-10 rounded-xl flex items-center justify-center mr-4 flex-shrink-0`}
                              >
                                <info.icon className={`w-6 h-6 ${info.color}`} />
                              </div>
                              
                              <div>
                                <h3 className="font-bold text-gray-900 mb-2">
                                  {info.title}
                                </h3>
                                
                                <p className="text-gray-600 whitespace-pre-line">
                                  {info.content}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                    ))}
                  </div>
                  
                  {/* WhatsApp CTA */}
                  <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <MessageCircle className="w-8 h-8 text-white" />
                      </div>
                      
                      <h3 className="font-bold text-gray-900 mb-2">
                        Quick WhatsApp Support
                      </h3>
                      
                      <p className="text-gray-600 mb-4 text-sm">
                        Get instant answers to your solar questions
                      </p>
                      
                      <a
                          href="https://wa.me/03212579030"
                          target="_blank"
                          rel="noopener noreferrer"
                      >
                        <Button
                            type="button"
                            className="bg-green-500 hover:bg-green-600 w-full"
                            onClick={() => {
                              window.open(
                                  "https://wa.me/03212579030?text=Hi%20SSES%2C%20I%20want%20to%20discuss%20about%20your%20solar%20services.",
                                  "_blank",
                                  "noopener,noreferrer"
                              );
                            }}
                        >
                          Chat on WhatsApp
                        </Button>
                      </a>
                    </CardContent>
                  </Card>
                  
                  {/* Service Areas */}
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <MapPin className="w-5 h-5 mr-2 text-orange-600" />
                        Service Areas
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="grid grid-cols-2 gap-2">
                        {serviceAreas.map((city, index) => (
                            <div key={index} className="text-sm text-gray-700 py-1">
                              • {city}
                            </div>
                        ))}
                      </div>
                      
                      <p className="text-xs text-gray-500 mt-4">
                        And surrounding areas. Contact us for coverage in other
                        cities.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              {/* Map Section */}
              <div className="mt-20">
                <Card className="border-0 shadow-xl overflow-hidden">
                  <CardHeader>
                    <CardTitle className="text-2xl text-center">
                      Visit Our Head Office
                    </CardTitle>
                    
                    <p className="text-gray-600 text-center">
                      Located in the heart of Karachi's business district
                    </p>
                  </CardHeader>
                  
                  <CardContent className="p-0">
                    <div className="aspect-[16/9] bg-gray-200 flex items-center justify-center">
                      <div className="text-center">
                        <MapPin className="w-16 h-16 text-orange-500 mx-auto mb-4" />
                        
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          Interactive Map
                        </h3>
                        
                        <p className="text-gray-600">
                          Plot 123, Block 5, Clifton, Karachi
                        </p>
                        
                        <a
                            href="https://www.google.com/maps/search/?api=1&query=Clifton+Karachi+Pakistan"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                          <Button className="mt-4 bg-orange-600 hover:bg-orange-700">
                            Get Directions
                          </Button>
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </Layout>
  );
}