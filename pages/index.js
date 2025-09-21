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

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home({data}) {
    console.log('Home',data);
  return (
      <Layout>
        <HeroSection banner={data.banner} />
        
        <WhyChooseUs home6={data.boardF} />
          {data?.service_section?.services && (
              <ServicesSection services={data.service_section.services} />
          )}
          <BudgetCalculator />
        <ProjectShowcase projects={data.project_section.projects} />
        {data?.faq && <FAQ data={data.faq} objKey="faq" />}
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