import { getModels } from "@/lib/models/models";
import type { ModelsResponse } from "@/types/models";

const GET = async (): Promise<Response> => {
  const modelsResponse: ModelsResponse = await getModels();

  return Response.json(modelsResponse);
};

export const dynamic = "force-static" as const;

export { GET };
