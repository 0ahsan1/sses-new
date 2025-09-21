import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const queryObjectBuilder = (slug)=>{
  return {
    filters: { slug: { $eq: slug } },
    populate: {
      meta_info: { populate: { image: true, keywords: true } },
      banner: { populate: "*" },
      service_section: {
        populate: {
          services: {
            populate: {
              image: true,          // Populate image inside each service
              button: {
                populate:'*'      // Populate icon inside button inside each service
              }
            }
          },
          button: {
            populate: {
              icon: true           // Populate icon inside main button of the service_section
            }
          }
        }
      },
      project_section: {
        populate: {
          projects: {
            populate: {
              image: true,
              info: true
            }
          },
          button: {
            populate: "*"
          }
        }
      },
      ctaA: { populate: "*" },
      ctaB: { populate: "*" },
      ctaC: { populate: "*" },
      testimonial: { populate: "*" },
      faq: { populate: "*" },
      boardA: { populate: {
          items: { populate: { image: true, bg_image: true, button: { populate: { icon: true } } } },
          image: true,
          button: { populate: { icon: true } },
        }},
      boardB: { populate: {
          items: { populate: { image: true, bg_image: true, button: { populate: { icon: true } } } },
          image: true,
          button: { populate: { icon: true } },
        }},
      boardC: { populate: {
          items: { populate: { image: true, bg_image: true, button: { populate: { icon: true } } } },
          image: true,
          button: { populate: { icon: true } },
        }},
      boardD: { populate: {
          items: { populate: { image: true, bg_image: true, button: { populate: { icon: true } } } },
          image: true,
          button: { populate: { icon: true } },
        }},
      boardE: { populate: {
          items: { populate: { image: true, bg_image: true, button: { populate: { icon: true } } } },
          image: true,
          button: { populate: { icon: true } },
        }},
      boardF: { populate: {
          items: { populate: { image: true, bg_image: true, button: { populate: { icon: true } } } },
          image: true,
          button: { populate: { icon: true } },
        }},
      boardG: { populate: {
          items: { populate: { image: true, bg_image: true, button: { populate: { icon: true } } } },
          image: true,
          button: { populate: { icon: true } },
        }},
    },
  };
}