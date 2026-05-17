import Head from "next/head";
import { useRouter } from "next/router";

const SEO = ({
  title = "Sustainable Solar Energy Solutions | SSES",
  description = "Premium solar energy solutions for homes and businesses in Pakistan. Powering a sustainable future, one rooftop at a time.",
  keywords = ["solar energy", "solar panels", "solar power", "renewable energy", "Pakistan solar"],
  image = "/og-image.jpg",
  url = "",
  noIndex = false,
  metaInfo = null, // Strapi meta_info object
}) => {
  const router = useRouter();
  const canonicalUrl = url || `https://sses.pk${router.asPath}`;

  // Use Strapi meta_info if provided, otherwise use props
  const seoTitle = metaInfo?.title || title;
  const seoDescription = metaInfo?.description
    ? Array.isArray(metaInfo.description)
      ? metaInfo.description.map(item => item.children?.map(child => child.text).join("")).join(" ")
      : metaInfo.description
    : description;
  const seoKeywords = metaInfo?.keywords?.length > 0 
    ? metaInfo.keywords.map(kw => kw.keyword || kw).join(", ")
    : keywords;
  const seoImage = metaInfo?.image?.data?.attributes?.url || image;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={seoKeywords} />
      <meta name="author" content="Sustainable Solar Energy Solutions" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Robots */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={seoImage} />
      <meta property="og:site_name" content="Sustainable Solar Energy Solutions" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={seoImage} />
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      
      {/* Structured Data / JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Sustainable Solar Energy Solutions",
            description: seoDescription,
            url: "https://sses.pk",
            logo: "https://sses.pk/logo2.png",
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+92-301-820-7730",
              contactType: "customer service",
              email: "info.sustainablesolar@gmail.com",
              availableLanguage: "English",
            },
            address: {
              "@type": "PostalAddress",
              streetAddress: "Office # 813-B Anum Estate Building, Shahra-e-Faisal",
              addressLocality: "Karachi",
              addressRegion: "Sindh",
              postalCode: "74000",
              addressCountry: "PK",
            },
            sameAs: [
              "https://www.facebook.com/sses.pk",
              "https://www.instagram.com/sses.pk",
              "https://www.linkedin.com/company/sses-pk",
            ],
          }),
        }}
      />
    </Head>
  );
};

export default SEO;
