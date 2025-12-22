import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SendComms API Documentation",
  description: "API documentation for SendComms - Email, SMS, Data Bundles, and Airtime APIs for Africa",
  keywords: ["API", "Email", "SMS", "Data Bundles", "Airtime", "Africa", "Ghana", "Documentation"],
  openGraph: {
    title: "SendComms API Documentation",
    description: "Build powerful communication apps with SendComms APIs",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} antialiased bg-[#0b0c0e]`}>
        {children}
      </body>
    </html>
  );
}
