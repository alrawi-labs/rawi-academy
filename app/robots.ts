import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://rawi-academy.vercel.app";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/enroll/", "/*/enroll/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}