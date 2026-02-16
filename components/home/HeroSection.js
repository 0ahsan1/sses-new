import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Zap, Shield, Award } from "lucide-react";
import Image from "next/image";
import {STRAPI_BASE_URL} from "@/constants";

export default function HeroSection({ banner }) {
  // Safely extract banner data with defaults
  const title = banner?.title || "Power Your Future with";
  const description = banner?.description || `
    <p>Transform your home or business with premium solar solutions. 
    <br />Best prices in Pakistan. Zero down payment options available.</p>
  `;
  const button = banner?.button?.[0];
  const backgroundImage = banner?.image?.formats?.large?.url || 
                         banner?.image?.url || 
                         'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1920';

  // Parse HTML description safely
  const createMarkup = (html) => {
    return { __html: html };
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 py-12">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={`${STRAPI_BASE_URL}${backgroundImage}`}
          alt={banner?.image?.alternativeText || "Solar panels installation"}
          fill
          className="object-cover opacity-20"
          priority
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-transparent" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-orange-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-40 left-20 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="relative max-w-7xl mx-auto px-6 text-center z-10">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium mb-8">
            <Zap className="w-4 h-4 mr-2" />
            Pakistan's #1 Solar Installation Company
          </div>

          {/* Main Headline */}
          <h1 className="text-lg md:text-5xl font-bold text-white mb-6 leading-tight">
            {title}
          </h1>

          {/* Subheadline */}
          <div 
            className="text-sm md:text-lg text-gray-300 mb-8 leading-relaxed prose prose-invert"
            dangerouslySetInnerHTML={createMarkup(description)}
          />

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <div className="text-center">
              <div className="text-sm md:text-xl font-bold text-white">2000+</div>
              <div className="text-gray-400 text-sm">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-sm md:text-xl font-bold text-white">50MW+</div>
              <div className="text-gray-400 text-sm">Installed Capacity</div>
            </div>
            <div className="text-center">
              <div className="text-sm md:text-xl font-bold text-white">25 Years</div>
              <div className="text-gray-400 text-sm">Performance Warranty</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            {button && (
              <Button 
                asChild
                size="lg" 
                className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 text-sm md:text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <a href={button.link || '/contact'}>
                  {button.label || 'Get Free Solar Quote'}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
              </Button>
            )}
            {/*<Button */}
            {/*  variant="outline" */}
            {/*  size="lg" */}
            {/*  className="border-2 border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-xl backdrop-blur-sm"*/}
            {/*>*/}
            {/*  <Play className="w-5 h-5 mr-2" />*/}
            {/*  Watch How It Works*/}
            {/*</Button>*/}
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-6 text-gray-400">
            <div className="flex items-center">
              <Shield className="w-5 h-5 mr-2 text-green-400" />
              <span className="text-sm">25 Year Warranty</span>
            </div>
            <div className="flex items-center">
              <Award className="w-5 h-5 mr-2 text-blue-400" />
              <span className="text-sm">ISO Certified</span>
            </div>
            <div className="flex items-center">
              <Zap className="w-5 h-5 mr-2 text-orange-400" />
              <span className="text-sm">Tier-1 Components</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      {/*<div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">*/}
      {/*  <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">*/}
      {/*    <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce" />*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
  );
}