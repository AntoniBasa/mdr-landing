type BrandFontWeight = 300 | 800;

type BrandFont = {
  name: string;
  data: Buffer;
  weight: BrandFontWeight;
  style: "normal";
};

type BrandColors = {
  background: string;
  foreground: string;
  muted: string;
  accent: string;
};

export type { BrandFontWeight, BrandFont, BrandColors };
