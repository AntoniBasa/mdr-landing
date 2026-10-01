import type { ImageResponse } from "next/og";
import { createBrandIconResponse } from "@/lib/server/brand-images/brand-images";
import type { ImageSize } from "@/types/images";

const ICON_SIDE_LENGTH: number = 32;

const size: ImageSize = { width: ICON_SIDE_LENGTH, height: ICON_SIDE_LENGTH };

const contentType: string = "image/png";

const Icon = async (): Promise<ImageResponse> => {
  return createBrandIconResponse(ICON_SIDE_LENGTH);
};

export { size, contentType, Icon as default };
