import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Marla Cabs - Reliable Online Cab Booking in India",
  description: "Book your cab online instantly with Marla Cabs. We offer airport transfers, outstation cabs, local sightseeing, and corporate travel solutions.",
  openGraph: {
    title: "Marla Cabs - Reliable Online Cab Booking in India",
    description: "Book your cab online instantly with Marla Cabs. We offer airport transfers, outstation cabs, local sightseeing, and corporate travel solutions.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
