import React from 'react';
import Link from 'next/link';
import { ArrowRight, Zap, Sun, Battery, Droplets, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function ServicesSection({ data, services = [] }) {
  if (!services || services.length === 0) return null;

  const getServiceIcon = (title) => {
    if (title.includes('On-Grid')) return <Zap className="w-8 h-8 text-orange-500" />;
    if (title.includes('Off-Grid')) return <Battery className="w-8 h-8 text-blue-500" />;
    if (title.includes('Hybrid')) return <Sun className="w-8 h-8 text-yellow-500" />;
    return <Droplets className="w-8 h-8 text-teal-500" />;
  };

  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center sm:text-left max-w-3xl mb-16 mx-4">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            {data?.title}
          </h2>
          {data?.description && (
              <p className="text-lg text-slate-600" dangerouslySetInnerHTML={{
                __html: data?.description
              }}>
              </p>
          )}
        </div>

        {/* Desktop Grid (hidden on mobile) */}
        {/*<div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-8">*/}
        {/*  {services.map((service, index) => (*/}
        {/*    <ServiceCard */}
        {/*      key={service.id || index} */}
        {/*      service={service} */}
        {/*      getServiceIcon={getServiceIcon} */}
        {/*    />*/}
        {/*  ))}*/}
        {/*</div>*/}

        {/* Mobile & Tablet Carousel (hidden on desktop) */}
        <div className=" px-2">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {services.map((service, index) => (
                <CarouselItem key={service.id || index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <ServiceCard 
                      service={service} 
                      getServiceIcon={getServiceIcon} 
                      className="h-full"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </div>

        <div className="text-center mt-12">
          <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
            View All Services
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}

// Extracted Service Card as a separate component for reusability
function ServiceCard({ service, getServiceIcon, className = '' }) {
  return (
    <Card className={`group hover:shadow-xl transition-all duration-300 border border-slate-200 hover:border-orange-500/30 flex flex-col h-full ${className}`}>
      <CardHeader className="pb-2">
        <div className="p-3 bg-slate-50 rounded-lg w-fit mb-4 group-hover:bg-orange-50 transition-colors">
          {getServiceIcon(service.title)}
        </div>
        <CardTitle className="text-xl font-semibold text-slate-900 ">
          {service.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <CardDescription className="text-slate-600 mb-6 line-clamp-3 min-h-[72px]">
          {service.description?.[0]?.children?.[0]?.text || 'Learn more about our solar solutions.'}
        </CardDescription>
        <div className="mt-auto">
          <Button asChild variant="link" className="p-0 h-auto text-orange-600 hover:text-orange-700 group">
            <Link href={`/services/${service.slug}`}>
              Learn more
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
