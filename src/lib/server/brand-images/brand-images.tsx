import "server-only";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/data/site";
import type { BrandColors, BrandFont, BrandFontWeight } from "./types";

const BRAND_FONT_NAME: string = "Vela Sans";

const ICON_LETTER_SIZE_RATIO: number = 0.72;

const brandColors: BrandColors = {
  background: "#000000",
  foreground: "#ffffff",
  muted: "rgba(255, 255, 255, 0.5)",
  accent: "#2649e5",
};

const brandFontFileNames: Record<BrandFontWeight, string> = {
  300: "VelaSans-Light.ttf",
  800: "VelaSans-ExtraBold.ttf",
};

const readBrandFont = async (weight: BrandFontWeight): Promise<BrandFont> => {
  const fontPath: string = path.join(process.cwd(), "src", "fonts", brandFontFileNames[weight]);
  const data: Buffer = await readFile(fontPath);

  return { name: BRAND_FONT_NAME, data, weight, style: "normal" };
};

const readPublicImageDataUrl = async (assetPath: string): Promise<string> => {
  const absolutePath: string = path.join(process.cwd(), "public", assetPath);
  const imageData: Buffer = await readFile(absolutePath);

  return `data:image/png;base64,${imageData.toString("base64")}`;
};

const createBrandIconResponse = async (sideLength: number): Promise<ImageResponse> => {
  const extraBoldFont: BrandFont = await readBrandFont(800);
  const iconLetter: string = SITE_NAME.charAt(0);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: brandColors.background,
        color: brandColors.foreground,
        fontFamily: BRAND_FONT_NAME,
        fontWeight: 800,
        fontSize: sideLength * ICON_LETTER_SIZE_RATIO,
      }}
    >
      {iconLetter}
    </div>,
    { width: sideLength, height: sideLength, fonts: [extraBoldFont] },
  );
};

export {
  BRAND_FONT_NAME,
  brandColors,
  readBrandFont,
  readPublicImageDataUrl,
  createBrandIconResponse,
};
