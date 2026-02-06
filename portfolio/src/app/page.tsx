import type { Metadata } from "next";
import HomeClient from "@/components/HomeClient";

export const metadata: Metadata = {
    title: "Tomi Rahman | Web3 Infrastructure Operator & Community Builder",
    description: "Portfolio of Tomi Rahman - Web3 Infrastructure Operator, Community Builder, and Node Validator.",
    openGraph: {
        title: "Tomi Rahman | Web3 Infrastructure Operator",
        description: "Focusing on Web3 Infrastructure, Node Operations, and Community Growth.",
        url: "https://tomi.my.id",
        siteName: "Tomi Rahman Portfolio",
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Tomi Rahman | Web3 Infrastructure Operator",
        creator: "@tomi_r25",
    },
};

export default function Home() {
    return <HomeClient />;
}
