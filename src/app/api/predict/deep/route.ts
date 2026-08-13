import { predictDeep } from "@/lib/predict";

export async function POST(request: Request) {
  return predictDeep(request);
}
