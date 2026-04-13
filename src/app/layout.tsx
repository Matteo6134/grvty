import type { Metadata } from "next";
import { Sora, Syne, Space_Grotesk, DM_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["300", "400", "700", "800"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "grvty — Objects with gravity",
  description:
    "Objects with gravity. Raw matter. Considered form. 3D printed pyramidal lamp with 16 million RGB colors.",
  openGraph: {
    title: "grvty — Objects with gravity",
    description: "Raw matter. Considered form. 3D printed pyramidal lamp.",
    images: [{ url: "/images/og.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "grvty",
    description: "Objects with gravity. Raw matter. Considered form.",
    images: ["/images/og.png"],
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
      className={`${dmSans.variable} ${spaceGrotesk.variable} ${sora.variable} ${syne.variable} antialiased`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>
          <div className="card-frame" aria-hidden />
          <div className="noise-overlay" aria-hidden />
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
