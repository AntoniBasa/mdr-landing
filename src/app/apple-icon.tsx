import type { ImageResponse } from "next/og";
import { createBrandIconResponse } from "@/lib/server/brand-images/brand-images";
import type { ImageSize } from "@/types/images";

const APPLE_ICON_SIDE_LENGTH: number = 180;

const size: ImageSize = { width: APPLE_ICON_SIDE_LENGTH, height: APPLE_ICON_SIDE_LENGTH };

const contentType: string = "image/png";

const AppleIcon = async (): Promise<ImageResponse> => {
  return createBrandIconResponse(APPLE_ICON_SIDE_LENGTH);
};

export { size, contentType, AppleIcon as default };
