import type { JSX } from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { MotionProvider } from "@/components/providers/MotionProvider";
import "./globals.css";

const velaSans = localFont({
  src: [
    { path: "../fonts/VelaSans-Light.ttf", weight: "300", style: "normal" },
    { path: "../fonts/VelaSans-Regular.ttf", weight: "400", style: "normal" },
    { path: "../fonts/VelaSans-Medium.ttf", weight: "500", style: "normal" },
    { path: "../fonts/VelaSans-ExtraBold.ttf", weight: "800", style: "normal" },
  ],
  variable: "--font-vela",
  display: "swap",
});

const metadata: Metadata = {
  title: "MDR - Premium drones",
  description:
    "MDR builds premium drones for creators: Heavy, Ultra Light and Superfast. Pre-order yours today.",
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

export { metadata, RootLayout as default };
