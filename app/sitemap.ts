import { locales } from "@/lib/data";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/trips?locale=en`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  const tripUrls = data.data.map((trip) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/en/${trip.attributes.slug}`,
    lastModified: trip.attributes.updatedAt,
    alternates: {
      languages: {
        ru: `${process.env.NEXT_PUBLIC_BASE_URL}/ru/trips/${trip.attributes.slug}`,
        ar: `${process.env.NEXT_PUBLIC_BASE_URL}/ar/trips/${trip.attributes.slug}`,
      },
    },
    changeFrequency: "weekly",
    priority: 1,
  }));

  return [
    {
      url: process.env.NEXT_PUBLIC_BASE_URL as string,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/en/about-us`,
      lastModified: new Date(),
      alternates: {
        languages: {
          ru: `${process.env.NEXT_PUBLIC_BASE_URL}/ru/about-us`,
          ar: `${process.env.NEXT_PUBLIC_BASE_URL}/ar/about-us`,
        },
      },
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/en/contact-us`,
      lastModified: new Date(),
      alternates: {
        languages: {
          ru: `${process.env.NEXT_PUBLIC_BASE_URL}/ru/contact-us`,
          ar: `${process.env.NEXT_PUBLIC_BASE_URL}/ar/contact-us`,
        },
      },
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/en/faqs`,
      lastModified: new Date(),
      alternates: {
        languages: {
          ru: `${process.env.NEXT_PUBLIC_BASE_URL}/ru/faqs`,
          ar: `${process.env.NEXT_PUBLIC_BASE_URL}/ar/faqs`,
        },
      },
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/en/trips`,
      lastModified: new Date(),
      alternates: {
        languages: {
          ru: `${process.env.NEXT_PUBLIC_BASE_URL}/ru/trips`,
          ar: `${process.env.NEXT_PUBLIC_BASE_URL}/ar/trips`,
        },
      },
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/en/admin`,
      lastModified: new Date(),
      alternates: {
        languages: {
          ru: `${process.env.NEXT_PUBLIC_BASE_URL}/ru/admin`,
          ar: `${process.env.NEXT_PUBLIC_BASE_URL}/ar/admin`,
        },
      },
      changeFrequency: "daily",
      priority: 0.6,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/en`,
      lastModified: new Date(),
      alternates: {
        languages: {
          ru: `${process.env.NEXT_PUBLIC_BASE_URL}/ru`,
          ar: `${process.env.NEXT_PUBLIC_BASE_URL}/ar`,
        },
      },
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...tripUrls,
  ];
}
