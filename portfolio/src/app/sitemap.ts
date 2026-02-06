import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: "https://tomi.my.id",
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 1,
        },
        {
            url: "https://tomi.my.id/photography",
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        },
    ];
}
