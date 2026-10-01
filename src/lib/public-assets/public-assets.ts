import "server-only";
import { existsSync } from "node:fs";
import path from "node:path";

const checkPublicAssetExists = (assetPath: string): boolean => {
  const absolutePath: string = path.join(process.cwd(), "public", assetPath);

  return existsSync(absolutePath);
};

export { checkPublicAssetExists };
