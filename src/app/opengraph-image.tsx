import { ImageResponse } from "next/og";
import { defaultModelId, findModelById, models } from "@/data/models";
import {
  SITE_NAME,
  SOCIAL_IMAGE_ALTERNATIVE_TEXT,
  SOCIAL_IMAGE_EYEBROW,
  SOCIAL_IMAGE_HEADING,
} from "@/data/site";
import {
  BRAND_FONT_NAME,
  brandColors,
  readBrandFont,
  readPublicImageDataUrl,
} from "@/lib/server/brand-images/brand-images";
import type { BrandFont } from "@/lib/server/brand-images/types";
import { checkPublicAssetExists } from "@/lib/public-assets/public-assets";
import type { ImageSize } from "@/types/images";
import type { DroneModel } from "@/types/models";

const DRONE_IMAGE_WIDTH: number = 1360;

const DRONE_IMAGE_HEIGHT: number = 850;

const IMAGE_FADE_GRADIENT: string =
  "linear-gradient(to right, rgba(0, 0, 0, 1) 24%, rgba(0, 0, 0, 0) 56%)";

const alt: string = SOCIAL_IMAGE_ALTERNATIVE_TEXT;

const size: ImageSize = { width: 1200, height: 630 };

const contentType: string = "image/png";

const readDroneImageDataUrl = async (model: DroneModel): Promise<string | null> => {
  if (!checkPublicAssetExists(model.image)) {
    return null;
  }

  return readPublicImageDataUrl(model.image);
};

const OpenGraphImage = async (): Promise<ImageResponse> => {
  const lightFont: BrandFont = await readBrandFont(300);
  const extraBoldFont: BrandFont = await readBrandFont(800);
  const droneImageDataUrl: string | null = await readDroneImageDataUrl(
    findModelById(defaultModelId),
  );
  const modelNames: string = models
    .map((model: DroneModel): string => model.shortName)
    .join("  /  ");

  return new ImageResponse(
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: brandColors.background,
        color: brandColors.foreground,
        fontFamily: BRAND_FONT_NAME,
      }}
    >
      {droneImageDataUrl !== null && (
        <img
          src={droneImageDataUrl}
          alt=""
          width={DRONE_IMAGE_WIDTH}
          height={DRONE_IMAGE_HEIGHT}
          style={{ position: "absolute", left: 280, top: -170 }}
        />
      )}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundImage: IMAGE_FADE_GRADIENT,
        }}
      />
      <div style={{ display: "flex", fontSize: 40, fontWeight: 800, letterSpacing: "-0.09em" }}>
        {SITE_NAME}
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            fontSize: 22,
            fontWeight: 300,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: brandColors.muted,
          }}
        >
          {SOCIAL_IMAGE_EYEBROW}
        </div>
        <div style={{ display: "flex", marginTop: 16, fontSize: 72, fontWeight: 300 }}>
          {SOCIAL_IMAGE_HEADING}
        </div>
        <div style={{ display: "flex", alignItems: "center", marginTop: 36 }}>
          <div
            style={{
              display: "flex",
              paddingTop: 16,
              paddingBottom: 16,
              paddingLeft: 36,
              paddingRight: 36,
              borderRadius: 9999,
              background: brandColors.accent,
              fontSize: 24,
              fontWeight: 300,
            }}
          >
            Pre-order now
          </div>
          <div
            style={{
              display: "flex",
              marginLeft: 32,
              fontSize: 24,
              fontWeight: 300,
              color: brandColors.muted,
            }}
          >
            {modelNames}
          </div>
        </div>
      </div>
    </div>,
    { width: size.width, height: size.height, fonts: [lightFont, extraBoldFont] },
  );
};

export { alt, size, contentType, OpenGraphImage as default };
