import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import BudgetCalculator from "@/components/home/BudgetCalculator";
import ProjectShowcase from "@/components/home/ProjectShowCase";
import React from "react";
import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import Layout from "@/components/Layout";
import {strapiBasePath, strapiConfig} from "@/services/ApiService";
import axios from "axios";
import {queryObjectBuilder} from "@/lib/utils";
import qs from "qs";
import {FAQ} from "@/components/FAQ";
import HeroSectionV2 from "@/components/home/HeroSectionv2";
import CTASection from "@/components/home/CTA";
import StatsSection from "@/components/home/StatsSection";
import HeroSectionV3 from "@/components/home/HeroSectionV3";
import AboutStats from "@/components/stats/about";
import WhyChooseUsVariant from "@/components/WhyChoose";
import ServiceSlider from "@/components/Slider/ServiceSlider";
import {SolarCalculator} from "@/components/Solar/Calculator";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home({data}) {
    console.log('home data',data)
    console.log('WhyChooseUsVariant data home',data.boardF)
    
    return (
      <Layout>
        <HeroSectionV3 banner={data.banner} />
        {/*<StatsSection />*/}
          <AboutStats />
        {/*<WhyChooseUs home6={data.boardF} />*/}
          <WhyChooseUsVariant data={data.boardF} />
          <CTASection data={data.ctaA} />
          <ServiceSlider data={data.service_section} />
          {/*<BudgetCalculator />*/}
          <SolarCalculator />
          <CTASection data={data.ctaB} />
        <ProjectShowcase projects={data.project_section.projects} />
        {data?.faq && <FAQ data={data.faq} objKey="faq" />}
          <CTASection data={data.ctaC} />
      </Layout>
  );
}

export async function getServerSideProps() {
    const queryObject = queryObjectBuilder("home")
    
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