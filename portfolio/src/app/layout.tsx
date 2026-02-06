import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import ScrollProgress from "@/components/ScrollProgress";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    metadataBase: new URL("https://tomi.my.id"),
    title: {
        default: "Tomi Rahman | Web3 Infrastructure Operator",
        template: "%s | Tomi Rahman"
    },
    description: "Personal portfolio of Tomi Rahman. Web3 Infrastructure Operator, Community Builder, and Node Validator. Focusing on decentralized networks and ecosystem growth.",
    keywords: ["Web3", "Node Operator", "Community Manager", "Blockchain", "Manta Network", "Validator", "Portfolio"],
    authors: [{ name: "Tomi Rahman", url: "https://tomi.my.id" }],
    creator: "Tomi Rahman",
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://tomi.my.id",
        siteName: "Tomi Rahman Portfolio",
        title: "Tomi Rahman | Web3 Infrastructure & Community",
        description: "Web3 Infrastructure Operator, Community Builder, and Node Validator.",
        images: [
            {
                url: "/assets/og-image.png", // We will need to ensure this exists or use a fallback
                width: 1200,
                height: 630,
                alt: "Tomi Rahman - Web3 Portfolio"
            }
        ]
    },
    twitter: {
        card: "summary_large_image",
        title: "Tomi Rahman | Web3 Infrastructure Operator",
        creator: "@tomi_r25",
        images: ["/assets/og-image.png"],
    },
    robots: {
        index: true,
        follow: true,
    }
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className}>
                <Providers>
                    <ScrollProgress />
                    {children}
                </Providers>
            </body>
        </html>
    );
}
