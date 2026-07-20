import type { MetadataRoute } from "next";

const SITE_URL = "https://sudarshanfoundation.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/admin/",
          "/user",
          "/user/",
          "/create-super-admin",
          "/workshop",
          "/workshop/",
          "/landing",
          "/4days",
          "/payment",
          "/api/",
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
