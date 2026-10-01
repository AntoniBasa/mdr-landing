import type { JSX } from "react";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE } from "@/data/site";
import { getSiteUrl } from "@/lib/server/site-url/site-url";
import "./globals.css";

const velaSans = localFont({
  src: [
    { path: "../fonts/VelaSans-Light.woff2", weight: "300", style: "normal" },
    { path: "../fonts/VelaSans-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/VelaSans-Medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/VelaSans-ExtraBold.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-vela",
  display: "swap",
});

const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

const RootLayout = (props: LayoutProps<"/">): JSX.Element => {
  const { children } = props;

  return (
    <html lang="en" className={`${velaSans.variable} antialiased`}>
      <body className="min-h-full bg-bg font-sans text-fg">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
};

export { metadata, viewport, RootLayout as default };
