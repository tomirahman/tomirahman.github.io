import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import ScrollProgress from "@/components/ScrollProgress";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    metadataBase: new URL("https://tomi.my.id"),
    title: {
        default: "Tomi Rahman | Web3 Infrastructure Operator & Node Validator",
        template: "%s | Tomi Rahman"
    },
    description: "Experienced Web3 Infrastructure Operator & Community Builder. Specializing in decentralized networks, node validation, and driving ecosystem growth.",
    keywords: ["Web3", "Node Operator", "Community Manager", "Blockchain", "Manta Network", "Validator", "Portfolio"],
    authors: [{ name: "Tomi Rahman", url: "https://tomi.my.id" }],
    creator: "Tomi Rahman",
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://tomi.my.id",
        siteName: "Tomi Rahman Portfolio",
        title: "Tomi Rahman | Web3 Infrastructure Operator & Node Validator",
        description: "Experienced Web3 Infrastructure Operator & Community Builder. Specializing in decentralized networks, node validation, and driving ecosystem growth.",
        images: [
            {
                url: "/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "Tomi Rahman - Web3 Portfolio"
            }
        ]
    },
    twitter: {
        card: "summary_large_image",
        title: "Tomi Rahman | Web3 Infrastructure Operator & Node Validator",
        description: "Experienced Web3 Infrastructure Operator & Community Builder. Specializing in decentralized networks, node validation, and driving ecosystem growth.",
        creator: "@tomi_r25",
        images: ["/og-image.jpg"],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    verification: {
        google: "wjO3XRy26ZAa9SRfkOHfjkfm6mHwLM4Itxd-GoCDY1M",
    },
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
