import type { Metadata } from "next";
import PhotographyClient from "@/components/PhotographyClient";

export const metadata: Metadata = {
    title: "Photography | Tomi Rahman",
    description: "A collection of moments captured by Tomi Rahman.",
    openGraph: {
        title: "Photography | Tomi Rahman",
        description: "Visual stories through the lens.",
        url: "https://tomi.my.id/photography",
        siteName: "Tomi Rahman Portfolio",
        locale: "en_US",
        type: "website",
    },
};

export default function PhotographyPage() {
    return <PhotographyClient />;
}
