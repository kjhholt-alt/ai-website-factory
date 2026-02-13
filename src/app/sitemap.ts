import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://n16soccertraining.com";

  const routes = [
    { url: baseUrl, lastModified: new Date(), priority: 1.0 },
    { url: `${baseUrl}/register`, lastModified: new Date(), priority: 0.9 },
  ];

  if (siteConfig.pages.about) {
    routes.push({
      url: `${baseUrl}/#about`,
      lastModified: new Date(),
      priority: 0.7,
    });
  }

  routes.push(
    { url: `${baseUrl}/terms`, lastModified: new Date(), priority: 0.3 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), priority: 0.3 }
  );

  return routes;
}
